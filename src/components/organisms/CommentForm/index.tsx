"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "@/apis/comment";
import Comment, { CommentWithChild } from "@/components/molecules/Comment";
import CommentSubmit from "@/components/molecules/CommentSubmit";
import useCommentsMutation from "@/hooks/useCommentsMutation";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";

interface Props {
  id: number;
}

function CommentForm({ id }: Props) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["/comments", id],
    ({ pageParam = null }) => getComments(id, pageParam),
    {
      retry: false,
      getNextPageParam: (lastPage) => {
        const newKey = lastPage?.data?.response?.nextCursorRequest?.key;
        return newKey !== -1 ? newKey : undefined;
      },
    },
  );

  const { mutate, queryClient } = useCommentsMutation();

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const target = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        if (hasNextPage) {
          await fetchNextPage();
        }
        observer.observe(entry.target);
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const handleSubmit = () => {
    const payload = {
      id,
      content: commentRef.current!.value,
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/comments", id]);
        commentRef.current!.value = "";
        commentRef.current!.style.height = "40px";
        commentRef.current!.style.overflowY = "hidden";
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const observer = useMemo(() => new IntersectionObserver(handleIntersect), [handleIntersect]);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
    return () => observer.disconnect();
  }, [target, data, observer]);

  return (
    <div>
      <h2 className="mt-4 text-xl">댓글</h2>
      <div className="mt-6 flex items-center justify-between">
        <CircularProfileImage src="/images/default_profile_image.png" styleType="lg" />
        <CommentSubmit commentRef={commentRef} onClick={handleSubmit} />
      </div>
      <div className="mt-6">
        {data?.pages?.map(
          (page) =>
            page?.data?.response?.comments.map((comment: CommentWithChild) => (
              <Comment comment={comment} key={comment.id} />
            )),
        )}
      </div>
      {hasNextPage && <div className="observe-area" ref={target} />}
    </div>
  );
}

export default CommentForm;

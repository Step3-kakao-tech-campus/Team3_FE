"use client";

import React, { useCallback, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getComments, postComments } from "@/apis/comment";
import Comment, { CommentWithChild } from "@/components/molecules/Comment";
import CommentSubmit from "@/components/molecules/CommentSubmit";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import useToast from "@/hooks/useToast";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { getMyProfile } from "@/apis/profile";
import { getCookie } from "@/utils/Cookie";

interface Props {
  id: number;
}

function CommentForm({ id }: Props): JSX.Element {
  const userId = getCookie("userId");

  const { mutate, queryClient } = useMutateWithQueryClient(postComments);

  if (!userId) {
    queryClient.removeQueries({ queryKey: ["/api/users/mine"] });
  }

  const { data: profileData } = useQuery(["/api/users/mine"], getMyProfile, {
    enabled: !!userId,
  });

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

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { addWarningToast } = useToast();

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

  const { targetRef } = useIntersectionObserver(handleIntersect);

  const handleSubmit = () => {
    if (commentRef.current!.value === "") {
      addWarningToast("내용을 입력해 주세요.");
      return;
    }
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

  return (
    <div>
      <h2 className="mt-4 text-xl">댓글</h2>
      <div className="mt-6 flex items-center justify-between gap-3">
        <CircularProfileImage src={profileData?.data?.response.profileImage} styleType="lg" />
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
      {hasNextPage && <div className="observe-area" ref={targetRef} />}
    </div>
  );
}

export default CommentForm;

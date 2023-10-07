"use client";

import { MdSend } from "react-icons/md";
import RoundImage from "@/components/atoms/RoundImage";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import getComments from "@/apis/comment";
import Comment, { CommentWithChild } from "@/components/molecules/Comment";

interface Props {
  id: string;
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

  const observer = useMemo(() => new IntersectionObserver(handleIntersect), [handleIntersect]);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, data, observer]);

  return (
    <div>
      <h2 className="mt-4 text-xl">댓글</h2>
      <div className="mt-6 flex items-center justify-between">
        <RoundImage alt="유저 프로필 이미지" src="/images/default_profile_image.png" className="w-10 h-10" />
        <input
          type="text"
          placeholder="내용을 입력해 주세요."
          className="w-5/6 py-2 px-3 rounded-lg border border-gray-400"
        />
        <MdSend size="36" className="text-neutral-400 cursor-pointer" />
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

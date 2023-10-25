"use client";

import { deleteMessageCard, getMessages } from "@/apis/message";
import Button from "@/components/atoms/Button";
import MessageCard from "@/components/molecules/MessageCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { MessageCardType } from "@/types/message";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useCallback } from "react";

function MessageRoomList(): JSX.Element {
  const [checkList, setCheckList] = useState<number[]>([]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["/api/messages/opponents"],
    ({ pageParam = null }) => getMessages(pageParam),
    {
      retry: false,
      getNextPageParam: (lastPage) => {
        const newKey = lastPage?.data?.response?.nextCursorRequest?.key;
        return newKey !== -1 ? newKey : undefined;
      },
    },
  );

  const { mutate, queryClient } = useMutateWithQueryClient(deleteMessageCard);

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

  const handleDelete = () => {
    checkList.forEach((item) => {
      mutate(
        { id: item },
        {
          onSuccess: () => {
            setCheckList([]);
            queryClient.invalidateQueries(["/api/messages/opponents"]);
          },
          onError: () => {},
        },
      );
    });
  };

  return (
    <div>
      <h1 className="mt-6 font-bold text-2xl">내 쪽지함</h1>
      <div className="mt-6 flex items-center justify-between">
        <Button styleType="outlined-orange" fontWeight="normal" rounded="full" size="sm" onClick={handleDelete}>
          선택 삭제
        </Button>
        <Button styleType="thunder" fontWeight="normal" rounded="full" size="sm">
          사용자 검색
        </Button>
      </div>
      <div className="styled-scroll flex flex-col gap-4 mt-6 p-6 h-[580px] border border-gray-400 overflow-y-auto">
        {data?.pages?.map(
          (page) =>
            page?.data?.response?.messages.map((message: MessageCardType) => (
              <MessageCard messageCard={message} key={message.opponentUserId} setCheckList={setCheckList} />
            )),
        )}
        {hasNextPage && <div className="observe-area" ref={targetRef} />}
      </div>
    </div>
  );
}

export default MessageRoomList;

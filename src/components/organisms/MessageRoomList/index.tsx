"use client";

import { deleteMessageCard, getMessages } from "@/apis/message";
import Button from "@/components/atoms/Button";
import MessageCard from "@/components/molecules/MessageCard";
import UserSearchModal from "@/components/molecules/Modal/UserSearchModal";
import useApiErrorToast from "@/hooks/useApiErrorToast";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import useToast from "@/hooks/useToast";
import { MessageCardType } from "@/types/message";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useCallback } from "react";

function MessageRoomList(): JSX.Element {
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { addSuccessToast } = useToast();
  const { addApiErrorToast } = useApiErrorToast();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["/api/messages/opponents"],
    ({ pageParam = null }) => getMessages(pageParam),
    {
      retry: false,
      suspense: true,
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
            queryClient.invalidateQueries(["/api/messages/opponents"]);
            setCheckList([]);
            addSuccessToast("성공적으로 삭제되었습니다.");
          },
          onError: (err) => {
            addApiErrorToast({ err, alt: "삭제에 실패했습니다." });
          },
        },
      );
    });
  };

  const handleModalOpen = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <div>
      <h1 className="mt-6 font-bold text-2xl">내 쪽지함</h1>
      <div className="mt-6 flex items-center justify-between">
        <Button styleType="outlined-orange" fontWeight="normal" rounded="full" size="sm" onClick={handleDelete}>
          선택 삭제
        </Button>
        <Button styleType="thunder" fontWeight="normal" rounded="full" size="sm" onClick={handleModalOpen}>
          사용자 검색
        </Button>
      </div>
      <div className="styled-scroll flex flex-col gap-4 mt-6 p-6 h-[580px] border border-gray-400 overflow-y-auto md:h-[520px] md:p-4">
        {data?.pages?.map(
          (page) =>
            page?.data?.response?.messages.map((message: MessageCardType) => (
              <MessageCard messageCard={message} key={message.opponentUserId} setCheckList={setCheckList} />
            )),
        )}
        {hasNextPage && <div className="observe-area" ref={targetRef} />}
      </div>
      {isSearchModalOpen && (
        <UserSearchModal
          onDismiss={() => {
            setIsSearchModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default MessageRoomList;

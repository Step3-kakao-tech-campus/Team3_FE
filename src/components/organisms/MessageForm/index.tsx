"use client";

import { getUserMessages } from "@/apis/message";
import Message from "@/components/molecules/Message";
import MessageSubmit from "@/components/molecules/MessageSubmit";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { MessageType } from "@/types/message";
import { formatDateToMessageDay } from "@/utils/formatDateToString";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";

function MessageForm(): JSX.Element {
  const params = useParams();
  const id = parseInt(params.opponent_user_id as string, 10);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [`/api/messages/opponents/${id}`, id],
    ({ pageParam = null }) => getUserMessages(id, pageParam),
    {
      retry: false,
      getNextPageParam: (lastPage) => {
        const newKey = lastPage?.data?.response?.nextCursorRequest?.key;
        return newKey !== -1 ? newKey : undefined;
      },
    },
  );

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

  return (
    <div>
      <h1 className="mt-6 text-center text-2xl font-semibold">{`${data?.pages[0]?.data?.response?.opponentUserName}님과의 대화`}</h1>
      <hr className="mt-4" />
      <div className="styled-scroll flex flex-col-reverse gap-4 mt-2 h-[580px] overflow-y-auto">
        {data?.pages?.map(
          (page) =>
            page?.data?.response?.messages.map((message: MessageType, index: number) => {
              const messages = page?.data?.response?.messages;
              const date = new Date(message.time).getDate();

              let isDate = false;
              let isProfile = false;
              if (message.isReceive) {
                if (index === messages.length - 1) {
                  isProfile = true;
                } else if (!messages[index + 1].isReceive) {
                  isProfile = true;
                }
              }
              if (index === messages.length - 1) {
                isDate = true;
              } else if (date !== new Date(messages[index + 1].time).getDate()) {
                isDate = true;
              }

              return (
                <React.Fragment key={message.id}>
                  <Message
                    message={message}
                    isProfile={isProfile}
                    opponentUserName={page?.data?.response?.opponentUserName}
                    opponentUserProfileImage={page?.data?.response?.opponentUserProfileImage}
                  />
                  {isDate && (
                    <div className="my-4 mx-20 py-2 bg-gray-400 rounded-full text-gray-600 text-center">
                      {formatDateToMessageDay(message.time)}
                    </div>
                  )}
                </React.Fragment>
              );
            }),
        )}
        <div>{hasNextPage && <div className="observe-area" ref={targetRef} />}</div>
      </div>
      <MessageSubmit />
    </div>
  );
}

export default MessageForm;

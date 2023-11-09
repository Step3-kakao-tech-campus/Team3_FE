"use client";

import { TiDeleteOutline } from "react-icons/ti";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { MessageType } from "@/types/message";
import { formatDateToMessageTime } from "@/utils/formatDateToString";
import React, { useState } from "react";
import { deleteMessages } from "@/apis/message";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { useParams } from "next/navigation";
import useApiErrorToast from "@/hooks/useApiErrorToast";
import ReconfirmModal from "../SemiModal/ReconfirmModal";

interface Props {
  message: MessageType;
  isProfile: boolean;
  opponentUserName: string;
  opponentUserProfileImage: string | null;
}

function Message({ message, isProfile, opponentUserName, opponentUserProfileImage }: Props): JSX.Element {
  const params = useParams();
  const id = parseInt(params.opponent_user_id as string, 10);
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, queryClient } = useMutateWithQueryClient(deleteMessages);

  const { addApiErrorToast } = useApiErrorToast();

  let style;
  if (message.isReceive) {
    style = "bg-[#FDAA49] rounded-br-md";
  } else {
    style = "bg-[#FDF1C4] rounded-bl-md";
  }

  const handleComplete = () => {
    mutate(
      { id: message.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([`/api/messages/opponents/${id}`, id]);
          setModalOpen(false);
        },
        onError: (err) => {
          addApiErrorToast({ err, alt: "메세지 삭제에 실패했습니다." });
        },
      },
    );
  };

  return (
    <div className={`relative flex ${!message.isReceive && "flex-row-reverse"}`}>
      {isProfile && (
        <>
          <div className="absolute top-[-16px]">
            <CircularProfileImage src={opponentUserProfileImage} styleType="xl" />
          </div>
          <span className="absolute top-[-24px] left-14 text-sm font-medium md:left-12">{opponentUserName}</span>
        </>
      )}
      <div
        className={`flex ${!message.isReceive && "flex-row-reverse"}`}
        onMouseEnter={() => {
          if (!message.isReceive) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (!message.isReceive) setIsHovered(false);
        }}
      >
        <pre
          className={`inline-block max-w-[420px] mx-2 p-2 rounded-t-md ${style} whitespace-pre-wrap break-all ${
            message.isReceive && "ml-14 md:ml-12"
          } md:max-w-[230px]`}
        >
          {message.content}
        </pre>
        {isHovered ? (
          <button
            type="button"
            className="mt-auto ml-[34px] p-1 bg-amber-200 rounded-md hover:brightness-95"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <TiDeleteOutline className="w-5 h-5" />
          </button>
        ) : (
          <span className="text-xs mt-auto">{formatDateToMessageTime(message.time)}</span>
        )}
      </div>
      {modalOpen && (
        <ReconfirmModal
          target="메시지를"
          handleComplete={handleComplete}
          handleCancel={() => {
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Message;

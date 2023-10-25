"use client";

import CheckBox from "@/components/atoms/CheckBox";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { MessageCardType } from "@/types/message";
import { formatDateToStringByDot } from "@/utils/formatDateToString";
import processString from "@/utils/processString";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  messageCard: MessageCardType;
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>;
}

function MessageCard({ messageCard, setCheckList }: Props): JSX.Element {
  const router = useRouter();
  const handleOnDoubleClick = () => {
    router.push(`/message/${messageCard.opponentUserId}`);
  };

  return (
    <div
      className="relative flex items-center px-4 py-2 h-[90px] bg-white border border-gray-400 rounded-md cursor-pointer hover:brightness-95"
      onDoubleClick={handleOnDoubleClick}
    >
      <CheckBox id={messageCard.opponentUserId} setCheckList={setCheckList} />
      <CircularProfileImage
        src={messageCard.opponentUserProfileImage ? messageCard.opponentUserProfileImage : ""}
        styleType="xl"
      />
      <div className="ml-4">
        <div className="flex gap-4 text-sm">
          <span>{messageCard.opponentUserName}</span>
          <div className="text-gray-500">{formatDateToStringByDot(messageCard.recentTime)}</div>
        </div>
        <pre className="mt-3 leading-tight">{processString(messageCard.recentMessage)}</pre>
      </div>
      {messageCard.countNew ? (
        <span className="absolute right-4 w-6 h-6 bg-orange-500 text-center text-white rounded-full">
          {messageCard.countNew}
        </span>
      ) : null}
    </div>
  );
}

export default React.memo(MessageCard);

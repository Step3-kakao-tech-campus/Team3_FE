import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { MessageType } from "@/types/message";
import { formatDateToMessageTime } from "@/utils/formatDateToString";
import React from "react";

interface Props {
  message: MessageType;
  isProfile: boolean;
  opponentUserName: string;
  opponentUserProfileImage: string | null;
}

function Message({ message, isProfile, opponentUserName, opponentUserProfileImage }: Props): JSX.Element {
  let style;
  if (message.isReceive) {
    style = "bg-[#FDAA49] rounded-br-md";
  } else {
    style = "bg-[#FDF1C4] rounded-bl-md";
  }

  return (
    <div className={`relative flex ${!message.isReceive && "flex-row-reverse"}`}>
      {isProfile && (
        <>
          <div className="absolute bottom-2">
            <CircularProfileImage src={opponentUserProfileImage} styleType="xl" />
          </div>
          <span className="absolute top-[-24px] left-14 text-sm font-medium">{opponentUserName}</span>
        </>
      )}
      <pre
        className={`inline-block max-w-[420px] mx-2 p-2 rounded-t-md ${style} whitespace-pre-wrap break-all ${
          message.isReceive && "ml-14"
        }`}
      >
        {message.content}
      </pre>
      <span className="text-xs mt-auto">{formatDateToMessageTime(message.time)}</span>
    </div>
  );
}

export default Message;

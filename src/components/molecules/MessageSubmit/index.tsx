"use client";

import { postMessages } from "@/apis/message";
import Button from "@/components/atoms/Button";
import useApiErrorToast from "@/hooks/useApiErrorToast";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { useParams } from "next/navigation";
import React, { useRef } from "react";

function MessageSubmit() {
  const params = useParams();
  const id = parseInt(params.opponent_user_id as string, 10);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate, queryClient } = useMutateWithQueryClient(postMessages);

  const { addApiErrorToast } = useApiErrorToast();

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    if (textarea.clientHeight >= 166) {
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = () => {
    if (textAreaRef.current!.value.trim() === "") return;
    const payload = {
      id,
      content: textAreaRef.current!.value,
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries([`/api/messages/opponents/${id}`, id]);
        textAreaRef.current!.value = "";
        textAreaRef.current!.style.height = "40px";
        textAreaRef.current!.style.overflowY = "hidden";
      },
      onError: (err) => {
        addApiErrorToast({ err, alt: "메세지 전송에 실패했습니다." });
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center gap-4 mt-6 md:gap-3 md:mt-3">
      <textarea
        className="resize-none flex-1 h-[40px] max-h-[168px] py-2 px-3 rounded-lg border border-gray-400 overflow-y-hidden"
        placeholder="내용을 입력해 주세요."
        rows={1}
        ref={textAreaRef}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <Button styleType="thunder" fontWeight="normal" rounded="full" size="md" onClick={handleSubmit}>
        전송
      </Button>
    </div>
  );
}

export default MessageSubmit;

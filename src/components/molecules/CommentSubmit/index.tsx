import React from "react";
import { MdSend } from "react-icons/md";

interface Props {
  commentRef?: React.RefObject<HTMLTextAreaElement>;
  value?: string;
  handleSetValue?: (value: string) => void;
  onClick: () => void;
}

function CommentSubmit({ commentRef, value, handleSetValue, onClick }: Props): JSX.Element {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    if (handleSetValue) handleSetValue(textarea.value);

    if (textarea.clientHeight >= 86) {
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <textarea
        className="resize-none flex-1 h-[40px] max-h-[88px] py-2 px-3 rounded-lg border border-gray-400 overflow-y-hidden"
        placeholder="내용을 입력해 주세요."
        rows={1}
        ref={commentRef}
        value={value}
        onChange={handleOnChange}
      />
      <MdSend className="w-9 h-9 text-neutral-400 cursor-pointer" onClick={onClick} />
    </>
  );
}

export default CommentSubmit;

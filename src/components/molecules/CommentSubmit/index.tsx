import React from "react";
import { MdSend } from "react-icons/md";

interface Props {
  commentRef: React.RefObject<HTMLTextAreaElement>;
  onClick: () => void;
}

function CommentSubmit({ commentRef, onClick }: Props) {
  const currentRef = commentRef.current;

  const handleResize = () => {
    if (currentRef!.clientHeight >= 86) {
      currentRef!.style.overflowY = "auto";
    } else {
      currentRef!.style.overflowY = "hidden";
    }
    currentRef!.style.height = "auto";
    currentRef!.style.height = `${currentRef!.scrollHeight}px`;
  };

  return (
    <>
      <textarea
        className="resize-none w-5/6 h-[40px] max-h-[88px] py-2 px-3 rounded-lg border border-gray-400 overflow-y-hidden"
        placeholder="내용을 입력해 주세요."
        rows={1}
        ref={commentRef}
        onInput={handleResize}
      />
      <MdSend size="36" className="text-neutral-400 cursor-pointer" onClick={onClick} />
    </>
  );
}

export default CommentSubmit;

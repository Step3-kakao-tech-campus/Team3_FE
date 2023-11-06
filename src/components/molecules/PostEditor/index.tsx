import React from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  handleOnClick: () => void;
}

function PostEditor({ id, handleOnClick }: Props) {
  const router = useRouter();

  return (
    <div className="flex text-neutral-500 gap-3">
      <button
        type="button"
        className="flex items-center cursor-pointer"
        onClick={() => {
          router.push(`/post/${id}/edit`);
        }}
      >
        <MdOutlineEdit />
        수정
      </button>
      <button type="button" className="flex items-center cursor-pointer" onClick={handleOnClick}>
        <MdOutlineDelete />
        삭제
      </button>
    </div>
  );
}

export default PostEditor;

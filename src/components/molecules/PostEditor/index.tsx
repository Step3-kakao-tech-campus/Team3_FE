import React from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { deletePost } from "@/apis/posts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
}

function PostEditor({ id }: Props) {
  const { mutate } = useMutation(deletePost);
  const router = useRouter();

  const handleDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          router.refresh();
          router.push("/");
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <div className="flex text-neutral-500 gap-3">
      <button type="button" className="flex items-center cursor-pointer">
        <MdOutlineEdit />
        수정
      </button>
      <button type="button" className="flex items-center cursor-pointer" onClick={handleDelete}>
        <MdOutlineDelete />
        삭제
      </button>
    </div>
  );
}

export default PostEditor;

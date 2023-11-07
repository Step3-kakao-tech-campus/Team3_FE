import React, { useState } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/apis/posts";
import ReconfirmModal from "../SemiModal/ReconfirmModal";

interface Props {
  id: number;
}

function PostEditor({ id }: Props) {
  const router = useRouter();

  const [reconfirmModalOpen, setReconfirmModalOpen] = useState(false);

  const { mutate } = useMutation(deletePost);
  const { addSuccessToast } = useToast();

  const handleDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          setReconfirmModalOpen(false);
          router.push("/");
          addSuccessToast("성공적으로 삭제 되었습니다.");
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <>
      <div className="flex text-neutral-500 gap-3">
        <button
          type="button"
          className="flex items-center cursor-pointer md:text-xs"
          onClick={() => {
            router.push(`/post/${id}/edit`);
          }}
        >
          <MdOutlineEdit />
          수정
        </button>
        <button
          type="button"
          className="flex items-center cursor-pointer md:text-xs"
          onClick={() => {
            setReconfirmModalOpen(true);
          }}
        >
          <MdOutlineDelete />
          삭제
        </button>
      </div>
      {reconfirmModalOpen && (
        <ReconfirmModal
          target="게시글을"
          handleComplete={handleDelete}
          handleCancel={() => {
            setReconfirmModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default PostEditor;

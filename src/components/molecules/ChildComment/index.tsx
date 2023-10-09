import { MdOutlineSubdirectoryArrowRight, MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import React from "react";
import { CommentData } from "@/types/commentData";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { deleteComments } from "@/apis/comment";
import { getCookie } from "@/utils/Cookie";

interface Props {
  childComment: CommentData;
  id: number;
}

function ChildComment({ childComment, id }: Props) {
  const userId = parseInt(getCookie("userId"), 10);

  const { mutate, queryClient } = useMutateWithQueryClient(deleteComments);

  const handleDeleteComment = () => {
    const payload = {
      postId: id,
      commentId: childComment.id,
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/comments", id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <MdOutlineSubdirectoryArrowRight size="32" className="text-neutral-400" />
        <CircularProfileImage src="/images/default_profile_image.png" styleType="lg" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[#2a5885]">{childComment.userName}</span>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              {childComment.userId === userId && (
                <>
                  <span className="flex items-center cursor-pointer">
                    <MdOutlineEdit />
                    수정
                  </span>
                  <button type="button" onClick={handleDeleteComment} className="flex items-center cursor-pointer">
                    <MdOutlineDelete />
                    삭제
                  </button>
                </>
              )}
              <span>답글 달기</span>
            </div>
          </div>
          <pre className="whitespace-pre-wrap break-all">{childComment.content}</pre>
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
}

export default ChildComment;

import { CommentData } from "@/types/commentData";
import { getCookie } from "@/utils/Cookie";
import React, { useState } from "react";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { deleteComments, putComments } from "@/apis/comment";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useToast from "@/hooks/useToast";
import CommentSubmit from "../CommentSubmit";
import Link from "next/link";

interface Props {
  comment: CommentData;
  isChild: boolean;
  handleReplyForm?: () => void;
}

function CommentBlock({ comment, isChild, handleReplyForm }: Props): JSX.Element {
  const userId = parseInt(getCookie("userId"), 10);
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  const [update, setUpdate] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  const { mutate, queryClient } = useMutateWithQueryClient(deleteComments);
  const { mutate: putMutate } = useMutation(putComments);

  const { addWarningToast } = useToast();

  const payload = {
    postId: id,
    commentId: comment.id,
  };

  const handleUpdateForm = () => {
    setUpdate((prev) => !prev);
    setCommentContent(comment.content);
  };

  const handleDeleteComment = () => {
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/comments", id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleUpdate = () => {
    if (commentContent === "") {
      addWarningToast("내용을 입력해 주세요.");
      return;
    }
    const putPayload = {
      ...payload,
      content: commentContent,
    };
    putMutate(putPayload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/comments", id]);
        setUpdate(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Link href={`/user_profile/${comment.userId}`}>
          <span className="text-[#2a5885] hover:underline">{comment.userName}</span>
        </Link>
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          {comment.userId === userId && (
            <>
              <button type="button" onClick={handleUpdateForm} className="flex items-center cursor-pointer">
                <MdOutlineEdit />
                수정
              </button>
              <button type="button" onClick={handleDeleteComment} className="flex items-center cursor-pointer">
                <MdOutlineDelete />
                삭제
              </button>
            </>
          )}
          {isChild && (
            <button type="button" onClick={handleReplyForm}>
              답글 달기
            </button>
          )}
        </div>
      </div>
      {update ? (
        <div className="flex items-center gap-3 mt-2">
          <CommentSubmit onClick={handleUpdate} value={commentContent} setValue={setCommentContent} />
        </div>
      ) : (
        <pre className="whitespace-pre-wrap break-all">{comment.content}</pre>
      )}
    </>
  );
}

export default CommentBlock;

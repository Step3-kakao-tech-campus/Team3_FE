import React, { useRef, useState } from "react";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { CommentData } from "@/types/commentData";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { getCookie } from "@/utils/Cookie";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { deleteComments, putComments } from "@/apis/comment";
import { useMutation } from "@tanstack/react-query";
import ChildComment from "../ChildComment";
import CommentSubmit from "../CommentSubmit";

export interface CommentWithChild extends CommentData {
  childComments: CommentData[];
}

interface Props {
  comment: CommentWithChild;
  id: number;
}

function Comment({ comment, id }: Props) {
  const userId = parseInt(getCookie("userId"), 10);

  const [update, setUpdate] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate, queryClient } = useMutateWithQueryClient(deleteComments);
  const { mutate: putMutate } = useMutation(putComments);

  const payload = {
    postId: id,
    commentId: comment.id,
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
  const handleUpdateForm = () => {
    setUpdate((prev) => !prev);
    setCommentContent(comment.content);
  };
  const handleUpdate = () => {
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
      <div className="flex items-center gap-3">
        <CircularProfileImage src="/images/default_profile_image.png" styleType="lg" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[#2a5885]">{comment.userName}</span>
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
              <span>답글 달기</span>
            </div>
          </div>
          {update ? (
            <div className="flex items-center gap-3 mt-2">
              <CommentSubmit
                commentRef={commentRef}
                onClick={handleUpdate}
                value={commentContent}
                setValue={setCommentContent}
              />
            </div>
          ) : (
            <pre className="whitespace-pre-wrap break-all">{comment.content}</pre>
          )}
        </div>
      </div>
      <hr className="mt-2" />
      {comment.childComments &&
        comment.childComments.map((childComment) => (
          <ChildComment childComment={childComment} key={childComment.id} id={id} />
        ))}
    </>
  );
}

export default Comment;

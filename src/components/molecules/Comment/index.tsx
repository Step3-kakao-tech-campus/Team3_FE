import React from "react";
import { CommentData } from "@/types/commentData";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ChildComment from "../ChildComment";

export interface CommentWithChild extends CommentData {
  childComments: CommentData[];
}

interface Props {
  comment: CommentWithChild;
}

function Comment({ comment }: Props) {
  return (
    <>
      <div className="flex items-center gap-3">
        <CircularProfileImage src="/images/default_profile_image.png" styleType="lg" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[#2a5885]">{comment.userName}</span>
            <div className="text-neutral-400">
              <span className="text-sm">답글 달기</span>
            </div>
          </div>
          <div>{comment.content}</div>
        </div>
      </div>
      <hr className="mt-2" />
      {comment.childComments &&
        comment.childComments.map((childComment) => <ChildComment childComment={childComment} key={childComment.id} />)}
    </>
  );
}

export default Comment;

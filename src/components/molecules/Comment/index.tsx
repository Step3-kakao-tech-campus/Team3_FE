import React from "react";
import { CommentData } from "@/types/commentData";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ChildComment from "../ChildComment";
import CommentBlock from "../CommentBlock";

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
          <CommentBlock comment={comment} />
        </div>
      </div>
      <hr className="mt-2" />
      {comment.childComments &&
        comment.childComments.map((childComment) => <ChildComment childComment={childComment} key={childComment.id} />)}
    </>
  );
}

export default Comment;

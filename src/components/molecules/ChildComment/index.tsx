import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import React from "react";
import { CommentData } from "@/types/commentData";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import CommentBlock from "../CommentBlock";

interface Props {
  childComment: CommentData;
  id: number;
}

function ChildComment({ childComment, id }: Props) {
  return (
    <>
      <div className="flex items-center gap-3">
        <MdOutlineSubdirectoryArrowRight size="32" className="text-neutral-400" />
        <CircularProfileImage src="/images/default_profile_image.png" styleType="lg" />
        <div className="flex-1">
          <CommentBlock comment={childComment} id={id} />
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
}

export default ChildComment;

import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import React from "react";
import { CommentData } from "@/types/commentData";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ProfileLink from "@/components/atoms/ProfileLink";
import CommentBlock from "../CommentBlock";

interface Props {
  childComment: CommentData;
}

function ChildComment({ childComment }: Props): JSX.Element {
  return (
    <>
      <div className="flex items-center gap-3">
        <MdOutlineSubdirectoryArrowRight className="w-8 h-8 text-neutral-400" />
        <ProfileLink userId={childComment.userId}>
          <CircularProfileImage src={childComment.profileImage} styleType="lg" />
        </ProfileLink>
        <div className="flex-1">
          <CommentBlock comment={childComment} isChild={false} />
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
}

export default React.memo(ChildComment);

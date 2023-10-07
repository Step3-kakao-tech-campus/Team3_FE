import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import RoundImage from "@/components/atoms/RoundImage";
import React from "react";
import { CommentData } from "@/types/commentData";

interface Props {
  childComment: CommentData;
}

function ChildComment({ childComment }: Props) {
  return (
    <>
      <div className="flex items-center gap-3">
        <MdOutlineSubdirectoryArrowRight size="32" className="text-neutral-400" />
        <RoundImage alt="유저 프로필 이미지" src="/images/default_profile_image.png" className="w-9 h-9" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[#2a5885]">{childComment.userName}</span>
            <div className="text-neutral-400">
              <span className="text-sm">답글 달기</span>
            </div>
          </div>
          <div>{childComment.content}</div>
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
}

export default ChildComment;

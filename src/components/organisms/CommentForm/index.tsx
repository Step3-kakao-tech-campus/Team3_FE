"use client";

import { MdSend } from "react-icons/md";
import React from "react";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";

interface Props {
  id: string;
}

function CommentForm({ id }: Props) {
  return (
    <div>
      <h2 className="mt-4 text-xl">댓글</h2>
      <div className="mt-6 flex items-center justify-between">
        <CircularProfileImage src="/images/default_profile_image.png" styleType="lg" />
        <input
          type="text"
          placeholder="내용을 입력해 주세요."
          className="w-5/6 py-2 px-3 rounded-lg border border-gray-400"
        />
        <MdSend size="36" className="text-neutral-400 cursor-pointer" />
      </div>
    </div>
  );
}

export default CommentForm;

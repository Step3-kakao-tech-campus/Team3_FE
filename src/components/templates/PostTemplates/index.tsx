"use client";

import { useState } from "react";
import { MdLocationOn, MdAlarm } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/apis/posts";
import Badge from "@/components/atoms/Badge";
import Participant from "@/components/atoms/Participant";
import { formatDateToString, formatDateToStringByDot } from "@/utils/formatDateToString";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ApplyButton from "@/components/molecules/ApplyButton";
import ApplicantConfirmModal from "@/components/molecules/Modal/ApplicantConfirmModal";
import ProfileLink from "@/components/atoms/ProfileLink";
import CommentForm from "@/components/organisms/CommentForm";
import PostEditor from "@/components/molecules/PostEditor";

interface Props {
  id: string;
}

function PostTemplates({ id }: Props): JSX.Element {
  const postId = parseInt(id, 10);

  const [modalOpen, setModalOpen] = useState(false);

  const { data } = useQuery([`/api/posts/${postId}`, postId], () => getPostById(postId), {
    staleTime: 1000 * 10,
    useErrorBoundary: true,
  });

  const post = data?.data?.response.post || {};

  return (
    <div>
      <div className="flex justify-between mt-6">
        <Badge isClose={post.isClose} dueTime={post.dueTime} />
        <div className="flex items-center">
          <Participant currentNumber={post.currentNumber} />
          <p className="searched-location flex items-center md:text-sm">
            <MdLocationOn className="inline text-red-500 w-5 h-5" />
            {post.districtName}
          </p>
        </div>
      </div>
      <h1 className="mt-4 text-2xl md:text-xl">{post.title}</h1>
      <div className="mt-4 flex justify-between md:mt-2">
        <div className="flex items-center">
          <ProfileLink className="flex items-center md:text-sm" userId={post.userId}>
            <CircularProfileImage src={post.profileImage || "/images/default_profile_image.png"} styleType="sm" />
            <span className="ml-1 hover:underline">{post.userName}</span>
          </ProfileLink>
          <span className="ml-2 text-neutral-400 text-sm md:text-xs md:w-[100px]">
            작성시간 : {formatDateToStringByDot(post.createdAt)}
          </span>
          <span className="ml-2 text-neutral-400 text-sm md:text-xs md:ml-1">
            조회수 <strong className="font-medium text-neutral-500">{post.viewCount}</strong>
          </span>
        </div>
        <PostEditor id={postId} userId={post.userId} />
      </div>
      <hr className="mt-4 md:mt-2" />
      <p className="flex mt-4 items-center gap-3">
        <span className="text-xl md:text-base">모집 정보</span>
        <span className="text-neutral-400 text-sm">모집 마감 {formatDateToString(post.dueTime)}</span>
      </p>
      <p className="flex mt-4 items-center gap-1 md:mt-2">
        <MdAlarm />
        {formatDateToString(post.startTime)}
      </p>
      <pre className="whitespace-pre-wrap mt-4 break-all">{post.content}</pre>
      <div className="mt-4 flex flex-row-reverse">
        <ApplyButton
          postId={postId}
          authorId={post.userId}
          onOpen={() => {
            setModalOpen(true);
          }}
        />
      </div>
      <hr className="mt-6" />
      <CommentForm id={postId} />
      {modalOpen && (
        <ApplicantConfirmModal
          postId={postId}
          onDismiss={() => {
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default PostTemplates;

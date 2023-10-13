"use client";

import { MdLocationOn, MdOutlineEdit, MdOutlineDelete, MdAlarm } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/apis/posts";
import Badge from "@/components/atoms/Badge";
import Participant from "@/components/atoms/Participant";
import { formatDateToString, formatDateToStringByDot } from "@/utils/formatDateToString";
import Button from "@/components/atoms/Button";
import CommentForm from "@/components/organisms/CommentForm";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";

interface Props {
  id: string;
}

function PostTemplates({ id }: Props) {
  const parameter = parseInt(id, 10);

  const { data } = useQuery([`/api/posts${id}`, id], () => getPostById(parameter), {
    onError: (error) => {
      console.log(error);
    },
  });

  const post = data?.data?.response.post || {};

  return (
    <div>
      <div className="flex justify-between mt-6">
        <Badge isClose={post.isClose} />
        <div className="flex items-center">
          <Participant currentNumber={post.currentNumber} />
          <p className="searched-location flex items-center">
            <MdLocationOn className="inline text-red-500 w-5 h-5" />
            {post.districtName}
          </p>
        </div>
      </div>
      <h1 className="mt-4 text-2xl">{post.title}</h1>
      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          <CircularProfileImage
            src={post.profileImage ? `임시APIURL${post.profileImage}` : "/images/default_profile_image.png"}
            styleType="sm"
          />
          <span className="ml-1">{post.userName}</span>
          <span className="ml-2 text-neutral-400 text-sm">작성시간 : {formatDateToStringByDot(post.createdAt)}</span>
          <span className="ml-2 text-neutral-400 text-sm">
            조회수 <strong className="font-medium text-neutral-500">{post.viewCount}</strong>
          </span>
        </div>
        <div className="flex text-neutral-500 gap-3">
          <span className="flex items-center cursor-pointer">
            <MdOutlineEdit />
            수정
          </span>
          <span className="flex items-center cursor-pointer">
            <MdOutlineDelete />
            삭제
          </span>
        </div>
      </div>
      <hr className="mt-6" />
      <p className="flex mt-4 items-center gap-3">
        <span className="text-xl">모집 정보</span>
        <span className="text-neutral-400 text-sm">모집 마감 {formatDateToString(post.dueTime)}</span>
      </p>
      <p className="flex mt-4 items-center gap-1">
        <MdAlarm />
        {formatDateToString(post.startTime)}
      </p>
      <pre className="whitespace-pre-wrap mt-4 break-all">{post.content}</pre>
      <div className="mt-4 flex flex-row-reverse">
        <Button styleType="thunder" rounded="md" size="sm">
          신청하기
        </Button>
      </div>
      <hr className="mt-6" />
      <CommentForm id={parameter} />
    </div>
  );
}

export default PostTemplates;

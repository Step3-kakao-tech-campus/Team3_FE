"use client";

import { getProfileById } from "@/apis/profile";
import postRating from "@/apis/rating";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import StarButtons from "@/components/atoms/StarButtons";
import useToast from "@/hooks/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function StarRatingTemplate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicantId = parseInt(searchParams.get("applicantId") as string, 10);
  const targetId = parseInt(searchParams.get("targetId") as string, 10);

  const [star, setStar] = useState(0);

  const { data } = useQuery([`/api/users/${targetId}`], () => getProfileById(targetId));
  const userName = data?.data?.response?.name;
  const userImage = data?.data?.response?.profileImage;

  const { addErrorToast, addSuccessToast } = useToast();
  const { mutate: postStarRating } = useMutation(postRating, {
    onSuccess: () => {
      addSuccessToast("등록이 완료되었습니다.");
      router.back();
    },
    onError: () => {
      addErrorToast("요청이 실패하였습니다.");
    },
  });

  return (
    <div className="star-rating-template flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xl">
        <CircularProfileImage src={userImage} />
        <h1>{userName && `${userName}님의`}</h1>
      </div>
      <div>
        <span className="ml-1">매너점수</span>
        <StarButtons star={star} setStar={setStar} />
      </div>
      <button
        type="button"
        className="w-full p-[3px] bg-thunder text-white rounded-full"
        onClick={() => postStarRating({ applicantId, targetId, rating: star })}
      >
        확인
      </button>
    </div>
  );
}

export default StarRatingTemplate;

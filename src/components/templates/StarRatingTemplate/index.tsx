"use client";

import { getProfileById } from "@/apis/profile";
import postRating from "@/apis/rating";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import StarButtons from "@/components/atoms/StarButtons";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import useToast from "@/hooks/useToast";
import { StarRatingModalProps } from "@/types/starRatingModalProps";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

function StarRatingTemplate({ postId, applicantId, targetId, onDismiss }: StarRatingModalProps) {
  const [star, setStar] = useState(0);
  const param = useParams();
  const searchParams = useSearchParams();
  const pageUserId = parseInt(param.scoreboard_user_id as string, 10);

  const { data } = useQuery([`/api/users/${targetId}`], () => getProfileById(targetId));
  const userName = data?.data?.response?.name;
  const userImage = data?.data?.response?.profileImage;

  const { addErrorToast, addSuccessToast } = useToast();
  const { mutate: postStarRating, queryClient } = useMutateWithQueryClient(postRating);
  const mutateOption = {
    onSuccess: () => {
      queryClient.invalidateQueries([`/api/posts/users/${pageUserId}/participation-records`, searchParams.toString()]);
      addSuccessToast("등록이 완료되었습니다.");
      onDismiss();
    },
    onError: () => {
      addErrorToast("요청이 실패하였습니다.");
    },
  };

  return (
    <div className="star-rating-template flex flex-col gap-3 md:m-2">
      <div className="flex items-center gap-2 text-xl md:mt-1 md:text-base">
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
        onClick={() => postStarRating({ postId, applicantId, targetId, rating: star }, mutateOption)}
      >
        확인
      </button>
    </div>
  );
}

export default StarRatingTemplate;

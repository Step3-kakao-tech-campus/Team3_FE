"use client";

import { getMyProfile } from "@/apis/profile";
import { getScore } from "@/apis/record";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ScoreEditForm from "@/components/organisms/ScoreEditForm";
import { useQuery } from "@tanstack/react-query";

function ScoreEditTemplate({ postId }: { postId: number }) {
  const { data: scoreData } = useQuery([`/api/posts/${postId}/scores`], () => getScore(postId));
  const { data: profileData } = useQuery(["/api/users/mine"], getMyProfile);

  const scores = scoreData?.data?.response?.scores;
  const userName = profileData?.data?.response?.name;
  const profileImage = profileData?.data?.response?.profileImage;

  return (
    <div className="score-edit-template">
      {profileData?.data?.response && (
        <div className="score-edit-title flex gap-2 text-2xl items-center leading-non mb-4 md:text-lg md:mb-3">
          <CircularProfileImage src={profileImage} styleType="lg" />
          <h1>{`${userName}님의 점수`}</h1>
        </div>
      )}
      {scores && <ScoreEditForm postId={postId} initialScoresData={scores} />}
    </div>
  );
}

export default ScoreEditTemplate;

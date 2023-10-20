"use client";

import { getScore } from "@/apis/record";
import ScoreEditForm from "@/components/organisms/ScoreEditForm";
import { useQuery } from "@tanstack/react-query";

function ScoreEditTemplate({ postId }: { postId: number }) {
  const { data } = useQuery([`/api/posts/${postId}/scores`], () => getScore(postId));
  const scores = data?.data?.response?.scores;
  return (
    <div className="score-edit-template">
      <ScoreEditForm initialScoresData={scores} />
    </div>
  );
}

export default ScoreEditTemplate;

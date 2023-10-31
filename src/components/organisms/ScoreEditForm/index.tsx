"use client";

import ScoreInput from "@/components/molecules/ScoreInput";
import useToast from "@/hooks/useToast";
import { Score, ScoreData } from "@/types/score";
import { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

interface Props {
  postId: number;
  initialScoresData: Score[];
}

function ScoreEditForm({ postId, initialScoresData }: Props) {
  const newScore = { id: Math.random(), scoreNum: 0, scoreImage: null, isNew: true };

  const [formScores, setFormScores] = useState<ScoreData[]>([]);
  useEffect(() => {
    const newFormScores: ScoreData[] = initialScoresData?.map((score) => {
      return { ...score, isNew: false };
    });
    setFormScores((prev) => {
      const mergedScores = [...newFormScores, ...prev.filter((score) => score.id < 1)];
      return mergedScores.length ? mergedScores : [newScore];
    });
  }, [initialScoresData]);

  const { addWarningToast } = useToast();
  const handleAdd = () => {
    if (formScores?.length >= 10) addWarningToast("최대 10 게임까지만 등록 가능합니다.");
    else {
      setFormScores((prev) => [...prev, newScore]);
    }
  };

  const handleRemove = (id: ScoreData["id"]) => {
    const newScores = formScores?.filter((formScore) => formScore.id !== id);
    setFormScores(newScores);
  };

  return (
    <div className="score-edit-form flex flex-col gap-2 min-w-[350px]">
      {formScores?.map((formScore) => (
        <ScoreInput
          key={formScore?.id}
          postId={postId}
          scoreData={formScore}
          onRemove={() => handleRemove(formScore?.id)}
        />
      ))}
      <button type="button" onClick={handleAdd}>
        <span className="inline-flex gap-1 text-neutral-500 items-center">
          <MdAddCircleOutline />
          게임 추가
        </span>
      </button>
    </div>
  );
}

export default ScoreEditForm;

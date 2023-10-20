"use client";

import ScoreInput from "@/components/molecules/ScoreInput";
import { Score, ScoreData } from "@/types/score";
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

interface Props {
  initialScoresData: Score[];
}

function ScoreEditForm({ initialScoresData }: Props) {
  const newScore = { id: Math.random(), scoreNum: 0, scoreImage: null, isNew: true };
  const initialScores: ScoreData[] = (initialScoresData?.length &&
    initialScoresData?.map((score) => {
      return { ...score, isNew: false };
    })) || [newScore];

  const [formScores, setFormScores] = useState<ScoreData[]>(initialScores);

  const handleAdd = () => {
    if (formScores?.length >= 10) alert("최대 10 게임까지만 등록 가능합니다.");
    else {
      setFormScores((prev) => [...prev, newScore]);
    }
  };

  const handleRemove = (id: ScoreData["id"]) => {
    const newScores = formScores?.filter((formScore) => formScore.id !== id);
    setFormScores(newScores);
  };

  return (
    <div className="score-edit-form flex flex-col gap-2">
      {formScores?.map((formScore) => (
        <ScoreInput key={formScore?.id} scoreData={formScore} onRemove={() => handleRemove(formScore?.id)} />
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

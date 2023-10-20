"use client";

import ScoreInput from "@/components/molecules/ScoreInput";
import { Score, ScoreData } from "@/types/score";
import { useState } from "react";

interface Props {
  initialScoresData: Score[];
}

function ScoreEditForm({ initialScoresData }: Props) {
  const initialScores: ScoreData[] =
    initialScoresData?.map((score) => {
      return { ...score, isNew: false };
    }) || [];
  const [formScores, setFormScores] = useState<ScoreData[]>(initialScores);

  const handleAdd = () => {
    if (formScores?.length >= 10) alert("최대 10 게임까지만 등록 가능합니다.");
    else {
      const newScore = { id: Math.random(), scoreNum: 0, scoreImage: null, isNew: true };
      setFormScores((prev) => [...prev, newScore]);
    }
  };

  const handleRemove = (id: ScoreData["id"]) => {
    const newScores = formScores?.filter((formScore) => formScore.id !== id);
    setFormScores(newScores);
  };

  return (
    <div>
      <h1>Score Form</h1>
      {formScores?.map((formScore) => (
        <ScoreInput key={formScore?.id} scoreData={formScore} onRemove={() => handleRemove(formScore?.id)} />
      ))}
      <button type="button" onClick={handleAdd}>
        게임 추가
      </button>
    </div>
  );
}

export default ScoreEditForm;

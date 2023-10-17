import ScoreInput from "@/components/molecules/ScoreInput";
import { ScoreData } from "@/types/score";
import { useState } from "react";

function ScoreEditForm() {
  const [formScores, setFormScores] = useState<ScoreData[]>([]);

  const handleUpdate = (scoreFromInput: ScoreData) => {
    const newScores = formScores.map((formScore) => (formScore.id === scoreFromInput.id ? scoreFromInput : formScore));
    setFormScores(newScores);
    console.log(formScores);
  };

  const handleAdd = () => {
    if (formScores.length >= 20) alert("최대 20 게임까지만 등록 가능합니다.");
    else {
      const newScore = { id: Math.random(), scoreNum: 0, scoreImage: null, isValid: true };
      setFormScores([...formScores, newScore]);
    }
  };

  const handleRemove = (id: ScoreData["id"]) => {
    const newScores = formScores.filter((formScore) => formScore.id !== id);
    setFormScores(newScores);
  };

  const handleSubmit = () => {
    const isAllValid = formScores.every(({ isValid }) => isValid);
    if (!isAllValid) alert("입력된 값들 중 유효하지 않은 값이 있습니다.");
    else {
      // 서버로 전송
      console.log("전송할 데이터:", formScores);
    }
  };

  return (
    <div>
      <h1>Score Form</h1>
      {formScores.map((formScore) => (
        <ScoreInput
          key={formScore?.id}
          scoreData={formScore}
          onUpdate={(newScore: ScoreData) => handleUpdate(newScore)}
          onRemove={() => handleRemove(formScore?.id)}
        />
      ))}
      <button type="button" onClick={handleAdd}>
        게임 추가
      </button>
      <button type="button" onClick={handleSubmit}>
        저장
      </button>
    </div>
  );
}

export default ScoreEditForm;

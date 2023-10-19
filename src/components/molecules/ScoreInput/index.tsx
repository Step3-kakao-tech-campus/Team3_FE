"use client";

import { postScore } from "@/apis/record";
import "./scoreInput.css";
import Button from "@/components/atoms/Button";
import { ScoreData } from "@/types/score";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";

interface Props {
  scoreData: ScoreData;
  onRemove: () => void;
}

function ScoreInput({ scoreData, onRemove }: Props) {
  const params = useParams();
  const postId = parseInt(params.post_id as string, 10);

  const fileRef = useRef<HTMLInputElement>(null);
  const [scoreValue, setScoreValue] = useState<ScoreData["scoreNum"]>(scoreData.scoreNum);
  const [selectedFile, setSelectedFile] = useState<ScoreData["scoreImage"]>(scoreData.scoreImage);
  const [scoreError, setScoreError] = useState("");
  const [fileError, setFileError] = useState("");

  const tenMB = 10485760;
  const fileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

  const isFileSelected = selectedFile !== null;
  const isValid = !scoreError && !fileError;

  const handleScoreInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scoreInputValue = parseInt(e.target.value, 10);
    if (scoreInputValue < 0 || scoreInputValue > 300 || Number.isNaN(scoreInputValue))
      setScoreError("점수는 0에서 300 사이의 값입니다.");
    else {
      setScoreValue(scoreInputValue);
      setScoreError("");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > tenMB) setFileError("파일의 크기는 10MB를 넘을 수 없습니다.");
    else if (file && !fileTypes.includes(file.type)) setFileError("png, jpg, jpeg, gif 형식의 파일만 허용됩니다.");
    else {
      setSelectedFile(file || null);
      setFileError("");
    }
  };

  return (
    <div className="score-input">
      <button type="button" onClick={onRemove}>
        삭제
      </button>
      <input
        type="number"
        onChange={handleScoreInputChange}
        className="border border-gray-400 rounded-lg py-1 px-2 appearance-none"
      />
      <Button
        rounded="full"
        size="xs"
        styleType={isFileSelected ? "filled-red" : "outlined-orange"}
        onClick={() => {
          if (isFileSelected) {
            setSelectedFile(null);
            setFileError("");
          } else fileRef.current?.click();
        }}
      >
        {isFileSelected ? "파일 제거" : "파일 입력"}
      </Button>
      <Button
        rounded="full"
        size="xs"
        styleType="thunder"
        onClick={() => postScore(postId, { score: scoreValue, image: selectedFile })}
      >
        저장
      </Button>
      <input
        type="file"
        ref={fileRef}
        accept="image/png, image/jpg, image/jpeg, image/gif"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div className="score-input-error-msg">
        {scoreError && <p className="text-red-500">{scoreError}</p>}
        {fileError && <p className="text-red-500">{fileError}</p>}
      </div>
    </div>
  );
}

export default ScoreInput;

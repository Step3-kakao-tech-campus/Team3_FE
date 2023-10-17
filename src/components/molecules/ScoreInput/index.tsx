"use client";

import "./scoreInput.css";
import Button from "@/components/atoms/Button";
import { useEffect, useRef, useState } from "react";

function ScoreInput({ scoreData, onUpdate, onRemove }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [scoreValue, setScoreValue] = useState<number>(scoreData.scoreNum);
  const [selectedFile, setSelectedFile] = useState<File | null>(scoreData.scoreImage);
  const [scoreError, setScoreError] = useState("");
  const [fileError, setFileError] = useState("");

  const tenMB = 10485760;
  const fileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

  const isFileSelected = selectedFile && true;

  const handleUpdate = () => {
    onUpdate({
      id: scoreData.id,
      scoreNum: scoreValue,
      scoreImage: selectedFile,
      isValid: !scoreError && !fileError,
    });
  };

  const handleScoreInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scoreInputValue = parseInt(e.target.value, 10);
    if (scoreInputValue < 0 || scoreInputValue > 300 || Number.isNaN(scoreInputValue)) {
      setScoreError("점수는 0에서 300 사이의 값입니다.");
    } else {
      setScoreError("");
      setScoreValue(scoreInputValue);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length && files[0].size > tenMB) {
      setFileError("파일의 크기는 10MB를 넘을 수 없습니다.");
    } else if (files?.length && !fileTypes.includes(files[0]?.type)) {
      setFileError("png, jpg, jpeg, gif 형식의 파일만 허용됩니다.");
    } else {
      setFileError("");
      setSelectedFile((files && files[0]) || null);
    }
  };

  useEffect(() => {
    handleUpdate();
  }, [scoreValue, selectedFile]);

  return (
    <div className="score-input">
      <button type="button" onClick={onRemove}>
        삭제
      </button>
      <input
        type="number"
        defaultValue={scoreData.scoreNum || 0}
        onChange={handleScoreInputChange}
        className="border border-gray-400 rounded-lg py-1 px-2 appearance-none"
      />
      <Button
        rounded="full"
        size="xs"
        styleType={isFileSelected ? "filled-red" : "outlined-orange"}
        onClick={() => {
          if (isFileSelected) setSelectedFile(null);
          else fileRef.current?.click();
        }}
      >
        {isFileSelected ? "파일 제거" : "파일 입력"}
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

"use client";

import { postScore, putScore } from "@/apis/record";
import "./scoreInput.css";
import Button from "@/components/atoms/Button";
import { ScoreData } from "@/types/score";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface Props {
  scoreData: ScoreData;
  onRemove: () => void;
}

function ScoreInput({ scoreData, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(scoreData.isNew);

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
  const { isNew } = scoreData;
  const isModified = scoreData.scoreNum !== scoreValue || scoreData.scoreImage !== selectedFile;

  const mutateOption = {
    onSuccess: () => setIsEditing(false),
    onError: () => {
      alert("저장에 실패했습니다.");
    },
  };
  const { mutate: postNewScore } = useMutation(postScore, mutateOption);
  const { mutate: putEditScore } = useMutation(putScore, mutateOption);

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

  const handleOnSave = () => {
    if (isValid && isNew) {
      const formData: { score: number; image?: File } = { score: scoreValue };
      if (selectedFile && typeof selectedFile !== "string") formData.image = selectedFile;
      postNewScore({ postId, formData }); // useMutation이용, onSuccess시 setIsEditing false
    } else if (isValid && !isNew && isModified) {
      const scoreId = scoreData.id;
      const isScoreModified = scoreValue !== scoreData.scoreNum;
      const isImageModified = selectedFile !== scoreData.scoreImage;
      const formData: { score?: number; image?: File } = {};
      if (isScoreModified) formData.score = scoreValue;
      if (isImageModified) formData.image = selectedFile;
      putEditScore({ postId, scoreId, formData }); // useMutation이용, onSuccess시 setIsEditing false
    } else if (isValid && !isNew && !isModified) {
      setIsEditing(false);
    }
  };

  return (
    <div className="score-input">
      {isEditing ? (
        <>
          <button type="button" onClick={onRemove}>
            삭제
          </button>
          <input
            type="number"
            defaultValue={scoreValue}
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
          <Button rounded="full" size="xs" styleType="thunder" onClick={handleOnSave}>
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
        </>
      ) : (
        <>
          <span>스코어</span>
          <span>{scoreValue}</span>
          <Button rounded="full" size="xs" styleType="outlined-orange" onClick={() => setIsEditing(true)}>
            수정하기
          </Button>
        </>
      )}
    </div>
  );
}

export default ScoreInput;

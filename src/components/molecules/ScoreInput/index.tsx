"use client";

import "./scoreInput.css";
import Button from "@/components/atoms/Button";
import { ScoreData } from "@/types/score";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import useScoreMutation from "@/hooks/useScoreMutation";
import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { MdRemoveCircleOutline, MdDeleteForever, MdCameraAlt } from "react-icons/md";

interface Props {
  scoreData: ScoreData;
  onRemove: () => void;
}

function ScoreInput({ scoreData, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(scoreData.isNew);

  const params = useParams();
  const postId = parseInt(params.post_id as string, 10);
  const scoreId = scoreData.id;

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

  const queryClient = useQueryClient();
  const optionPostPut: UseMutationOptions = {
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries([`/api/posts/${postId}/scores`]);
    },
    onError: () => {
      alert("저장에 실패했습니다.");
    },
  };
  const optionDelete: UseMutationOptions = {
    onSuccess: () => {
      onRemove();
      queryClient.invalidateQueries([`/api/posts/${postId}/scores`]);
    },
    onError: () => {
      alert("삭제에 실패했습니다.");
    },
  };
  const { postNewScore, putEditScore, deleteCurrentScore } = useScoreMutation({
    postOption: optionPostPut,
    putOption: optionPostPut,
    deleteOption: optionDelete,
  });

  const handleOnSave = () => {
    if (isValid && isNew) {
      const formData: { score: number; image?: File } = { score: scoreValue };
      if (selectedFile && typeof selectedFile !== "string") formData.image = selectedFile;
      postNewScore({ postId, formData });
    } else if (isValid && !isNew && isModified) {
      const isScoreModified = scoreValue !== scoreData.scoreNum;
      const isImageModified = selectedFile !== scoreData.scoreImage;
      const formData: { score?: number; image?: File } = {};
      if (isScoreModified) formData.score = scoreValue;
      if (isImageModified) formData.image = selectedFile as File | undefined;
      putEditScore({ postId, scoreId, formData });
    } else if (isValid && !isNew && !isModified) {
      setIsEditing(false);
    }
  };

  const handleRemove = () => {
    if (!isNew) deleteCurrentScore({ postId, scoreId });
    else onRemove();
  };

  return (
    <>
      <div className="score-input flex items-center gap-2">
        {isEditing ? (
          <>
            <button type="button" onClick={handleRemove} className="text-red-500 text-xl">
              <MdRemoveCircleOutline />
            </button>
            <input
              type="number"
              defaultValue={scoreValue}
              onChange={handleScoreInputChange}
              className="max-w-[120px] text-center border border-gray-400 rounded-lg py-1 px-2 appearance-none"
            />
            <Button
              rounded="full"
              size="sm"
              styleType={isFileSelected ? "outlined-red" : "outlined-orange"}
              fontWeight="normal"
              onClick={() => {
                if (isFileSelected) {
                  setSelectedFile(null);
                  setFileError("");
                } else fileRef.current?.click();
              }}
            >
              {isFileSelected ? (
                <span className="flex items-center text-sm gap-1">
                  <MdDeleteForever className="text-base" />
                  점수판 삭제
                </span>
              ) : (
                <span className="flex items-center text-sm gap-1">
                  <MdCameraAlt />
                  점수판 첨부
                </span>
              )}
            </Button>
            <Button rounded="full" size="sm" styleType="thunder" fontWeight="normal" onClick={handleOnSave}>
              저장
            </Button>
            <input
              type="file"
              ref={fileRef}
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </>
        ) : (
          <>
            <span>스코어</span>
            <span>{scoreValue}</span>
            <Button
              rounded="full"
              size="sm"
              styleType="outlined-orange"
              fontWeight="normal"
              onClick={() => setIsEditing(true)}
            >
              수정하기
            </Button>
          </>
        )}
      </div>
      <div className="score-input-error-msg text-center">
        {scoreError && <p className="text-red-500">{scoreError}</p>}
        {fileError && <p className="text-red-500">{fileError}</p>}
      </div>
    </>
  );
}

export default ScoreInput;

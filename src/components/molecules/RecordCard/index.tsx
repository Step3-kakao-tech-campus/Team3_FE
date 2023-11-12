"use client";

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-duplicates */
import React from "react";
import Badge from "@/components/atoms/Badge";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import Participant from "@/components/atoms/Participant";
import { RecordData } from "@/types/recordData";
import { getCookie } from "@/utils/Cookie";
import { formatDateToString } from "@/utils/formatDateToString";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { MdAlarm, MdLocationPin, MdArrowDropUp, MdArrowDropDown, MdMoreHoriz, MdCameraAlt } from "react-icons/md";
import Button from "@/components/atoms/Button";
import isPastTime from "@/utils/isPastTime";
import RecordCardMember from "../RecordCardMember";
import ScoreEditModal from "../Modal/ScoreEditModal";
import StarRatingModal from "../Modal/StarRatingModal";
import ImageModal from "../Modal/ImageModal";

interface Props {
  data: RecordData;
}

function RecordCard({ data }: Props): JSX.Element {
  const params = useParams();
  const [isExpand, setIsExpand] = useState(false);
  const [scoreEditModalOpen, setScoreEditModalOpen] = useState(false);
  const [starRatingModalOpen, setStarRatingModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(0);

  const { members, scores, isClose, startTime } = data;
  const isStartTimeOver = isPastTime(startTime);
  const clientUserId = getCookie("userId");
  const isMyRecord = clientUserId === parseInt(params.scoreboard_user_id as string, 10);

  const onScoreEditModalOpen = useCallback(() => setScoreEditModalOpen(true), []);
  const onStarRatingModalOpen = useCallback((newTargetId: number) => {
    setTargetId(newTargetId);
    setStarRatingModalOpen(true);
  }, []);
  const onDismissScoreEditModal = useCallback(() => setScoreEditModalOpen(false), []);
  const onDismissStarRatingModal = useCallback(() => setStarRatingModalOpen(false), []);

  return (
    <div className="record-card flex flex-col gap-6 bg-white p-7 rounded-2xl shadow md:gap-3 md:p-3">
      <div className="record-card-upper">
        <Badge isClose={data.isClose} dueTime={data.dueTime} />
        <Participant currentNumber={data.currentNumber} />
        <div className="inline-block md:text-sm md:mt-2 md:block">
          <span className="text-neutral-400">
            <span className="mr-1">모집마감</span>
            <span>{formatDateToString(data.dueTime)}</span>
          </span>
        </div>
      </div>
      <Link href={`/post/${data.id}`} className="record-title-wrapper">
        <h1 className="record-title text-2xl md:text-lg">{data.title}</h1>
      </Link>
      <div className="record-card-lower flex flex-col gap-2 md:gap-1">
        <RecordTimeWithLocation districtName={data.districtName} startTime={data.startTime} />
        <div className="scores flex flex-col gap-1">
          {scores.map((score) => (
            <ScoreWithImageButton key={`${data.id}:${score.id}`} scoreObj={score} />
          ))}
        </div>
        <div className="expand-button-with-member-image flex w-full justify-between items-center">
          <div className="member-image-preview flex gap-2 items-center">
            {!isExpand && <MembersImagePreview members={members} />}
          </div>
          <ExpandButton isExpand={isExpand} setIsExpand={setIsExpand} />
        </div>
        {isExpand &&
          (members.length ? (
            <div className="members grid grid-cols-2 gap-2 md:flex md:flex-col">
              {members.map((member) => (
                <RecordCardMember
                  key={`${data.id}:${member.id}`}
                  clientUserId={clientUserId}
                  isMyRecord={isMyRecord}
                  isClose={isClose}
                  isStartTimeOver={isStartTimeOver}
                  member={member}
                  scoresLength={scores.length}
                  onScoreEditModalOpen={onScoreEditModalOpen}
                  onStarRatingModalOpen={onStarRatingModalOpen}
                />
              ))}
            </div>
          ) : (
            <span className="no-member text-center text-2xl text-neutral-400">참여자가 없습니다.</span>
          ))}
        {isExpand && !isClose && (
          <span className="text-lg text-neutral-500 text-center md:text-base">
            모집자가 모집완료 처리를 한 이후 점수 및 별점 등록이 가능합니다.
          </span>
        )}
        {isExpand && isClose && !isStartTimeOver && (
          <span className="text-lg text-neutral-500 text-center md:text-base">
            게임 시작 시간이 지난 후 점수 및 별점 등록이 가능합니다.
          </span>
        )}
      </div>
      {scoreEditModalOpen && <ScoreEditModal postId={data?.id} onDismiss={onDismissScoreEditModal} />}
      {starRatingModalOpen && (
        <StarRatingModal
          postId={data?.id}
          applicantId={data?.applicantId}
          targetId={targetId}
          onDismiss={onDismissStarRatingModal}
        />
      )}
    </div>
  );
}

export default React.memo(RecordCard);

function RecordTimeWithLocation({
  districtName,
  startTime,
}: {
  districtName: RecordData["districtName"];
  startTime: RecordData["startTime"];
}) {
  return (
    <div className="record-info-wrapper flex gap-4 text-neutral-400 md:text-sm md:flex-col md:gap-1">
      <p className="district-name">
        <MdLocationPin className="inline" />
        <span>{districtName}</span>
      </p>
      <p className="start-time">
        <MdAlarm className="inline" />
        <span>{formatDateToString(startTime)}</span>
      </p>
    </div>
  );
}

function ScoreWithImageButton({ scoreObj }: { scoreObj: RecordData["scores"][number] }) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  return (
    <div className="score flex gap-2">
      <span>{`스코어 | ${scoreObj.score}`}</span>
      {scoreObj.scoreImage && (
        <Button
          rounded="full"
          size="xs"
          styleType="outlined-orange"
          fontWeight="normal"
          onClick={() => setImageModalOpen(true)}
        >
          <div className="inline-flex items-center gap-x-0.5 ">
            <MdCameraAlt className="inline" />
            <span className="leading-none">이미지 보기</span>
          </div>
        </Button>
      )}
      {scoreObj.scoreImage && imageModalOpen && (
        <ImageModal imagePath={scoreObj.scoreImage} onDismiss={() => setImageModalOpen(false)} />
      )}
    </div>
  );
}

function MembersImagePreview({ members }: { members: RecordData["members"] }) {
  return members.length > 3 ? (
    <>
      {members.slice(0, 3).map((member) => (
        <CircularProfileImage key={member.id} src={member.profileImage} styleType="md" />
      ))}
      <MdMoreHoriz className="text-neutral-400 w-8 h-8" />
    </>
  ) : (
    members.map((member) => <CircularProfileImage key={member.id} src={member.profileImage} styleType="md" />)
  );
}

function ExpandButton({
  isExpand,
  setIsExpand,
}: {
  isExpand: boolean;
  setIsExpand: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        setIsExpand((prev: boolean) => !prev);
      }}
    >
      {isExpand ? (
        <MdArrowDropUp className="h-12 w-12 hover:scale-125 transition md:w-9 md:h-9" />
      ) : (
        <MdArrowDropDown className="h-12 w-12 hover:scale-125 transition md:w-9 md:h-9" />
      )}
    </button>
  );
}

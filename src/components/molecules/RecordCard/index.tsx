"use client";

/* eslint-disable @typescript-eslint/no-use-before-define */
import Badge from "@/components/atoms/Badge";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import Participant from "@/components/atoms/Participant";
import { RecordData } from "@/types/recordData";
import { getCookie } from "@/utils/Cookie";
import { formatDateToString } from "@/utils/formatDateToString";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { MdAlarm, MdLocationPin, MdArrowDropUp, MdArrowDropDown, MdMoreHoriz, MdCameraAlt } from "react-icons/md";
import RecordCardMember from "../RecordCardMember";

interface Props {
  data: RecordData;
}

function RecordCard({ data }: Props) {
  const params = useParams();
  const [isExpand, setIsExpand] = useState(false);

  const members = data?.members;
  const scores = data?.scores;
  const clientUserId = getCookie("userId");
  const isMyRecord = clientUserId === parseInt(params.user_id as string, 10);

  return (
    <div className="record-card flex flex-col gap-6 bg-white p-7 rounded-2xl shadow ">
      <div className="record-card-upper">
        <Badge isClose={data.isClose} />
        <Participant currentNumber={data.currentNumber} />
        <span className="text-neutral-400">
          <span className="mr-1">모집마감</span>
          <span>{formatDateToString(data.dueTime)}</span>
        </span>
      </div>
      <Link href={`/post/${data.id}`} className="record-title-wrapper">
        <h1 className="record-title text-2xl">{data.title}</h1>
      </Link>
      <div className="record-card-lower flex flex-col gap-2">
        <RecordTimeWithLocation districtName={data.districtName} startTime={data.startTime} />
        <div className="scores">
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
            <div className="members grid grid-cols-2 gap-2">
              {members.map((member) => (
                <RecordCardMember
                  key={`${data.id}:${member.id}`}
                  clientUserId={clientUserId}
                  isMyRecord={isMyRecord}
                  member={member}
                  scoresLength={scores.length}
                />
              ))}
            </div>
          ) : (
            <span className="no-member text-center text-2xl text-neutral-400">참여자가 없습니다.</span>
          ))}
      </div>
    </div>
  );
}

export default RecordCard;

function RecordTimeWithLocation({ districtName, startTime }: { districtName: string; startTime: Date }) {
  return (
    <div className="record-info-wrapper flex gap-4 text-neutral-400">
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

function ScoreWithImageButton({ scoreObj }: { scoreObj: { id: number; score: number; scoreImage: string | null } }) {
  return (
    <div className="score flex gap-2">
      <span>{`스코어 ${scoreObj.id} | ${scoreObj.score}`}</span>
      {scoreObj.scoreImage && (
        <button
          type="button"
          className="inline-flex items-center gap-x-0.5 border border-thunderOrange text-thunderOrange text-sm rounded-full px-2 py-[3px] bg-white hover:brightness-95"
        >
          <MdCameraAlt className="inline" />
          <span className="leading-none">이미지 보기</span>
        </button>
      )}
    </div>
  );
}

function MembersImagePreview({
  members,
}: {
  members: {
    id: number;
    name: string;
    profileImage: string | null;
    isRated: boolean;
  }[];
}) {
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
        <MdArrowDropUp className="h-12 w-12 hover:scale-125 transition" />
      ) : (
        <MdArrowDropDown className="h-12 w-12 hover:scale-125 transition" />
      )}
    </button>
  );
}

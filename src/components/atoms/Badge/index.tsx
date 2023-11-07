import isPastTime from "@/utils/isPastTime";
import React from "react";

interface Props {
  isClose: boolean;
  dueTime: Date;
}

/**
 * Badge 컴포넌트 - 모집중, 마감 표현을 위한 뱃지
 * @param {boolean} isClose - 마감 여부를 불리언(true, false)으로 전달받는다
 * @param {Date} dueTime - 마감 시간을 Date 타입으로 전달받는다
 */
function Badge({ isClose, dueTime }: Props): JSX.Element {
  const isRecruitTimeOver = isPastTime(dueTime);
  const isRecruitClosed = isClose || isRecruitTimeOver;
  return (
    <span
      className={`inline-block text-white rounded-full px-3 py-1 ${
        isRecruitClosed ? "bg-neutral-400" : "bg-[#37D629]"
      } md:px-2 md:text-sm`}
    >
      {isRecruitClosed ? "마감" : "모집중"}
    </span>
  );
}

export default Badge;

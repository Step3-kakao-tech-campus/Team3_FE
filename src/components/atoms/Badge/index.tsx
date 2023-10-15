import React from "react";

interface Props {
  isClose: boolean;
}

/**
 * Badge 컴포넌트 - 모집중, 마감 표현을 위한 뱃지
 * @param {boolean} isClose - 마감 여부를 불리언(true, false)으로 전달받는다
 */
function Badge({ isClose }: Props): JSX.Element {
  return (
    <span className={`inline-block text-white rounded-full px-3 py-1 ${isClose ? "bg-neutral-400" : "bg-[#37D629]"}`}>
      {isClose ? "마감" : "모집중"}
    </span>
  );
}

export default Badge;

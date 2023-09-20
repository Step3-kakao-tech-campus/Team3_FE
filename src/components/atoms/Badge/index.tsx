import React from "react";

interface Props {
  isRecruiting: boolean;
}

/**
 * Badge 컴포넌트 - 모집중, 마감 표현을 위한 뱃지
 * @param {boolean} isRecruiting - 모집 여부를 불리언(true, false)으로 전달받는다
 */
function Badge({ isRecruiting }: Props) {
  return (
    <span
      className={`inline-block text-white rounded-full px-3 py-1 ${
        isRecruiting ? "bg-[#37D629]" : "bg-neutral-400"
      }`}
    >
      {isRecruiting ? "모집중" : "마감"}
    </span>
  );
}

export default Badge;

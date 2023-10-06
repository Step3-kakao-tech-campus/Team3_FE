"use client";

import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { MdLocationPin, MdMail, MdLeaderboard } from "react-icons/md";

function ProfileModalTemplate() {
  const buttonStyle = "min-w-[150px] p-2 mx-auto flex gap-2 justify-center items-center  bg-neutral-200 rounded-full";
  return (
    <div className="profile-modal-contents">
      <div className="profile-modal-upper flex gap-5 bg-thunder p-7 items-center">
        <CircularProfileImage src={null} styleType="huge" />
        <div className="user-info text-white flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">볼링조아</span>
            <span className="text-sm">Average 100</span>
          </div>
          <p>
            <MdLocationPin className="inline" />
            <span>부산광역시 부산진구 부전동</span>
          </p>
          <p>{`매너점수 ★ ${"user.rating " ? `${"user.rating"}/5` : "없음"}`}</p>
          {/* 내 프로필이라면 내 정보 수정 페이지 Link 추가 */}
        </div>
      </div>
      <div className="profile-modal-lower flex flex-col gap-4 p-7">
        <button type="button" className={buttonStyle}>
          <MdMail />
          쪽지 보내기
        </button>
        <button type="button" className={buttonStyle}>
          <MdLeaderboard />
          참여 기록
        </button>
        {/* 내 프로필이라면 내 쪽지함, 참여 기록 Link로 두 버튼 대체 */}
      </div>
    </div>
  );
}
export default ProfileModalTemplate;

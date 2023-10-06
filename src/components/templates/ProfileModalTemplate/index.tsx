"use client";

import { getProfileById } from "@/apis/profile";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { MdLocationPin, MdMail, MdLeaderboard } from "react-icons/md";

function ProfileModalTemplate() {
  const buttonStyle = "min-w-[150px] p-2 mx-auto flex gap-2 justify-center items-center  bg-neutral-200 rounded-full";
  const pageParam = useParams();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getProfileById(parseInt(pageParam.user_id as string, 10)),
  });

  const user = data?.data?.response;

  return (
    <div className="profile-modal-contents">
      <div className="profile-modal-upper flex gap-5 bg-thunder px-10 py-7 items-center">
        <CircularProfileImage src={user?.profileImage} styleType="huge" />
        <div className="user-info text-white flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{user?.name}</span>
            <span className="text-sm">{`Average ${user?.averageScore}`}</span>
          </div>
          <p>
            <MdLocationPin className="inline" />
            <span>{user?.address}</span>
          </p>
          <div className="rating flex justify-between items-center">
            <span>매너점수</span>
            <span>{`★ ${user?.rating ? `${user?.rating}/5` : "없음"}`}</span>
          </div>
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

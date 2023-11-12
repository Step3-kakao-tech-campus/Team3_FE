"use client";

import { getProfileById } from "@/apis/profile";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import profileModalState from "@/stores/atoms/profileModalState";
import { getCookie } from "@/utils/Cookie";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MdLocationPin, MdMail, MdLeaderboard } from "react-icons/md";
import { useSetRecoilState } from "recoil";

interface Props {
  userId: number;
}

function ProfileModalTemplate({ userId }: Props): JSX.Element {
  const setProfileModal = useSetRecoilState(profileModalState);

  const buttonStyle = "min-w-[150px] p-2 mx-auto flex gap-2 justify-center items-center  bg-neutral-200 rounded-full";
  const isMyProfile = getCookie("userId") === userId;
  const { data } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getProfileById(userId),
    suspense: true,
  });
  const router = useRouter();
  const user = data?.data?.response;

  return (
    <div className="profile-modal-contents">
      <div className="profile-modal-upper flex gap-5 bg-thunder px-10 py-7 items-center md:px-6 md:py-6 md:gap-3">
        <CircularProfileImage src={user?.profileImage} styleType="huge" />
        <div className="user-info text-white flex flex-col gap-1 md:mt-1">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold md:text-sm">{user?.name}</span>
            <span className="text-sm">{`Average ${user?.averageScore}`}</span>
          </div>
          <p>
            <MdLocationPin className="inline" />
            <span className="md:text-sm">{user?.address}</span>
          </p>
          <div className="rating flex justify-between items-center md:text-sm">
            <span>매너점수</span>
            <span>{`★ ${user?.rating ? `${user?.rating.toFixed(1)} / 5` : "없음"}`}</span>
          </div>
          {isMyProfile && (
            <div className="button_container ml-auto">
              <button
                type="button"
                className="text-sm underline"
                onClick={() => {
                  setProfileModal({ isOpen: false });
                  router.push(`/mypage`);
                }}
              >
                내 정보 수정
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-modal-lower flex flex-col gap-4 p-7 md:p-5">
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            setProfileModal({ isOpen: false });
            router.push(isMyProfile ? `/message` : `/message/${userId}`);
          }}
        >
          <MdMail />
          {isMyProfile ? "내 쪽지함" : "쪽지 보내기"}
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            setProfileModal({ isOpen: false });
            router.push(`/scoreboard/${userId}`);
          }}
        >
          <MdLeaderboard />
          참여 기록
        </button>
      </div>
    </div>
  );
}
export default ProfileModalTemplate;

"use client";

import { getProfileById } from "@/apis/profile";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { getCookie } from "@/utils/Cookie";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { MdLocationPin, MdMail, MdLeaderboard } from "react-icons/md";

function ProfileModalTemplate(): JSX.Element {
  const buttonStyle = "min-w-[150px] p-2 mx-auto flex gap-2 justify-center items-center  bg-neutral-200 rounded-full";
  const pageParam = useParams();
  const pageUserId = parseInt(pageParam.user_id as string, 10);
  const isMyProfile = getCookie("userId") === pageUserId;
  const { data } = useQuery({
    queryKey: ["userProfile", pageUserId],
    queryFn: () => getProfileById(pageUserId),
  });
  const router = useRouter();
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
            <span>{`★ ${user?.rating ? `${user?.rating} / 5` : "없음"}`}</span>
          </div>
          {isMyProfile && (
            <div className="button_container ml-auto">
              <button
                type="button"
                className="text-sm underline"
                onClick={() => {
                  router.push(`/close_modal`);
                  router.refresh();
                  router.replace(`/내정보수정페이지`);
                }}
              >
                내 정보 수정
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-modal-lower flex flex-col gap-4 p-7">
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            router.push(`/close_modal`);
            router.refresh();
            router.replace(`/쪽지페이지(내쪽지함or다른사람과의쪽지페이지)`);
          }}
        >
          <MdMail />
          {isMyProfile ? "내 쪽지함" : "쪽지 보내기"}
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            router.push(`/close_modal`);
            router.refresh();
            router.replace(`/scoreboard/${pageUserId}`);
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

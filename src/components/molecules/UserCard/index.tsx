"use client";

import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ProfileLink from "@/components/atoms/ProfileLink";
import useToast from "@/hooks/useToast";
import { UserData } from "@/types/user";
import { getCookie } from "@/utils/Cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { MdStar } from "react-icons/md";

interface Props {
  user: UserData;
}

function UserCard({ user }: Props) {
  const router = useRouter();
  const { addWarningToast } = useToast();

  const handleOnClick = () => {
    const id = parseInt(getCookie("userId"), 10);
    if (user.id === id) {
      addWarningToast("자신에게 메시지를 보낼 수 없습니다.");
    } else router.push(`/message/${user.id}`);
  };
  return (
    <div className="flex items-center gap-2 p-2 bg-white border border-gray-400 rounded-md">
      <ProfileLink userId={user.id}>
        <CircularProfileImage src={user.profileImage ? user.profileImage : ""} styleType="lg" />
      </ProfileLink>
      <div className="flex-1">
        <ProfileLink userId={user.id}>
          <span className="text-[#2a5885] font-bold hover:underline">{user.name}</span>
        </ProfileLink>
        <div className="text-sm text-gray-500">
          매너점수 <MdStar className=" ml-2 inline-block" /> {user.rating.toFixed(1)} / 5
        </div>
      </div>
      <Button styleType="thunder" rounded="full" size="sm" fontWeight="normal" onClick={handleOnClick}>
        쪽지 보내기
      </Button>
    </div>
  );
}

export default UserCard;

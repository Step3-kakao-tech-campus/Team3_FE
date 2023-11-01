import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ProfileLink from "@/components/atoms/ProfileLink";
import { UserData } from "@/types/user";
import Link from "next/link";
import React from "react";
import { MdStar } from "react-icons/md";

interface Props {
  user: UserData;
}

function UserCard({ user }: Props) {
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
      <Link href={`/message/${user.id}`}>
        <Button styleType="thunder" rounded="full" size="sm" fontWeight="normal">
          쪽지 보내기
        </Button>
      </Link>
    </div>
  );
}

export default UserCard;

"use client";

import { getMyProfile } from "@/apis/profile";
import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { deleteToken } from "@/utils/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function AuthUserProfile({ setIsLogin }: Props) {
  const { data } = useQuery(["/api/users/mine"], getMyProfile);
  const router = useRouter();

  const handleLogout = () => {
    deleteToken();
    setIsLogin(false);
    router.refresh();
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <CircularProfileImage src={data?.data?.response?.profileImage} />
        <span className="text-sm text-gray-500 hover:underline">{data?.data?.response?.name}님</span>
      </div>
      <Button styleType="white" rounded="md" size="sm" onClick={handleLogout}>
        로그아웃
      </Button>
    </>
  );
}

export default AuthUserProfile;

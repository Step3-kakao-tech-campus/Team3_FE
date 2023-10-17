"use client";

import { getMyProfile } from "@/apis/profile";
import Button from "@/components/atoms/Button";
import { deleteToken } from "@/utils/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function AuthUserProfile() {
  const { data } = useQuery(["/api/users/mine"], getMyProfile);
  const router = useRouter();

  const handleLogout = () => {
    deleteToken();
    router.refresh();
  };

  return (
    <>
      <span className="mr-2 text-sm text-gray-500">{data?.data?.response?.name}님</span>
      <Button styleType="white" rounded="md" size="sm" onClick={handleLogout}>
        로그아웃
      </Button>
    </>
  );
}

export default AuthUserProfile;

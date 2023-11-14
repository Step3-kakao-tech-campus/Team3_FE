"use client";

import { getMyProfile } from "@/apis/profile";
import { postLogout } from "@/apis/sign";
import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ProfileLink from "@/components/atoms/ProfileLink";
import useApiErrorToast from "@/hooks/useApiErrorToast";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { deleteToken } from "@/utils/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  onClickLogout: () => void;
}

function AuthUserProfile({ onClickLogout }: Props) {
  const { data, isLoading } = useQuery(["/api/users/mine"], getMyProfile, { cacheTime: Infinity, staleTime: Infinity });

  const { mutate, queryClient } = useMutateWithQueryClient(postLogout);
  const { addApiErrorToast } = useApiErrorToast();

  const router = useRouter();

  const handleLogout = () => {
    const payload: void = undefined;
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/api/users/mine"]);
        deleteToken();
        onClickLogout();
        router.refresh();
        router.push("/");
      },
      onError: (err) => {
        addApiErrorToast({ err, alt: "로그아웃을 실패했습니다." });
      },
    });
  };

  if (isLoading) return null;

  return (
    <>
      <ProfileLink userId={data?.data?.response?.id} className="flex items-center gap-1">
        <CircularProfileImage src={data?.data?.response?.profileImage} />
        <span className="text-sm text-gray-500 hover:underline md:w-0 md:invisible">
          {data?.data?.response?.name}님
        </span>
      </ProfileLink>
      <Button styleType="white" rounded="md" size="sm" onClick={handleLogout}>
        로그아웃
      </Button>
    </>
  );
}

export default AuthUserProfile;

"use client";

import Button from "@/components/atoms/Button";
import { getCookie } from "@/utils/Cookie";
import { useRouter } from "next/navigation";
import React from "react";
import AuthUserProfile from "./AuthUserProfile";

function AuthButton(): JSX.Element {
  const router = useRouter();
  const isLogin = getCookie("token");

  return (
    <div className="flex items-center space-x-4">
      {isLogin ? (
        <AuthUserProfile />
      ) : (
        <>
          <Button
            styleType="white"
            rounded="md"
            size="sm"
            onClick={() => {
              router.push("/signin", { scroll: false });
            }}
          >
            로그인
          </Button>
          <Button
            styleType="thunder"
            rounded="md"
            size="sm"
            onClick={() => {
              router.push("/signup", { scroll: false });
            }}
          >
            회원가입
          </Button>
        </>
      )}
    </div>
  );
}

export default AuthButton;

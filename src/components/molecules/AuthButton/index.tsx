"use client";

import Button from "@/components/atoms/Button";
import { getCookie } from "@/utils/Cookie";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AuthUserProfile from "./AuthUserProfile";

function AuthButton(): JSX.Element | null {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLoad(false);
    if (getCookie("token")) setIsLogin(true);
  });

  if (isLoad) return null;

  return (
    <div className="flex items-center space-x-4 md:space-x-2">
      {isLogin ? (
        <AuthUserProfile onClickLogout={() => setIsLogin(false)} />
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

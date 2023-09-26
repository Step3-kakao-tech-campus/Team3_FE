"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import InputBox from "@/components/molecules/InputBox";

function SigninHome() {
  const handleButtonClick = () => {
    console.log("회원가입 버튼 클릭");
  };
  return (
    <div className="py-3">
      <div className="flex items-center justify-center pb-[44px]">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <h1 className="text-[60px] text-transparent bg-clip-text bg-thunder">번개볼링</h1>
      </div>

      <div>
        <InputBox
          inputs={[
            {
              type: "email",
              placeholder: "이메일(아이디)",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400",
            },
            {
              type: "password",
              placeholder: "비밀번호",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400",
            },
          ]}
        />
      </div>

      {/* 회원가입 및 비밀번호 찾기 링크 */}
      <div className="flex justify-between text-sm">
        <a href="/signup" className="text-[#99A2A5] text-xl">
          회원가입
        </a>
        <a href="/forgot-password" className="text-[#99A2A5] text-xl">
          비밀번호 찾기
        </a>
      </div>

      {/* 제출 버튼 */}
      <p className="pb-[32px]" />
      <div className="flex justify-center ">
        <Button style="thunder" onClick={handleButtonClick} className="w-[546px] h-[60px] rounded-full text-xl">
          로그인
        </Button>
      </div>
      <p className="pb-[32px]" />
      <div className="flex justify-center ">
        <Button style="yellow" onClick={handleButtonClick} className="w-[546px] h-[60px] rounded-full text-xl">
          카카오 로그인
        </Button>
      </div>
    </div>
  );
}

export default SigninHome;

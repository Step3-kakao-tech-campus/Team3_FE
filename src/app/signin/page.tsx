"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import InputBox from "@/components/molecules/InputBox";
import Logo from "public/images/bowling_logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SigninHome() {
  const router = useRouter();

  return (
    <div className="py-3">
      <div className="flex items-center justify-center pb-[44px]">
        <Image src={Logo} alt="볼링 로고" width={100} height={100} />
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
        <button
          type="button"
          className="text-[#99A2A5] text-xl"
          onClick={() => {
            router.replace("/signup", { scroll: false });
          }}
        >
          회원가입
        </button>
        <Link href="/forgot-password" className="text-[#99A2A5] text-xl">
          비밀번호 찾기
        </Link>
      </div>

      {/* 제출 버튼 */}
      <p className="pb-[32px]" />
      <div className="flex justify-center ">
        <Button styleType="thunder_full">로그인</Button>
      </div>
      <p className="pb-[32px]" />
      <div className="flex justify-center ">
        {/* <Button styleType="yellow" onClick={handleButtonClick} className="w-[546px] h-[60px] rounded-full text-xl">
          카카오 로그인
        </Button> */}
      </div>
    </div>
  );
}

export default SigninHome;

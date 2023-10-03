"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import InputBox from "@/components/molecules/InputBox";
import Logo from "public/images/bowling_logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlankBar from "@/components/atoms/BlankBar";
import { validateEmail, validatePassword } from "@/utils/validation";

import { login } from "@/apis/postUser";
import { setLogin, getTokenPayload } from "@/utils/user";
import { islogin, setExpiryDate } from "@/stores/features/counterSlice";
import { useAppDispatch } from "@/stores/hooks";

function SigninForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const errRef = useRef<HTMLParagraphElement>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (fieldName: any, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      errRef.current!.innerHTML = "모든 항목을 입력해주세요.";
    } else if (!validateEmail(formData.email)) {
      errRef.current!.innerHTML = "이메일 형식이 올바르지 않습니다.";
    } else if (!validatePassword(formData.password)) {
      errRef.current!.innerHTML = "비밀번호는 영문,숫자, 특수문자가 모두 포함 8자 이상 20자 이하로 입력해주세요.";
    } else {
      try {
        errRef.current!.innerHTML = "";
        const response = await login(formData);
        const payload = getTokenPayload(response.headers.authorization);
        // 토큰 만료시간 설정
        dispatch(islogin(formData.email));
        dispatch(setExpiryDate(payload.exp));

        setLogin(formData.email, response.headers.authorization);

        router.back();
      } catch (e: any) {
        if (e.response) {
          alert(e.response.data.errorMessage);
        }
        router.back();
      }
      router.refresh();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center pb-[22px]">
        <Image src={Logo} alt="볼링 로고" width={50} height={50} />
        <h1 className="text-[40px] text-transparent bg-clip-text bg-thunder">번개볼링</h1>
      </div>

      <div>
        {/* 이메일 입력란 */}
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
          onInputChange={handleInputChange}
        />
      </div>
      <div>
        <p className="text-red-500 text-sm whitespace-pre-line" ref={errRef} />
      </div>
      <BlankBar />

      {/* 회원가입 및 비밀번호 찾기 링크 */}
      <div className="flex justify-between text-base">
        <button
          type="button"
          className="text-[#99A2A5]"
          onClick={() => {
            router.replace("/signup", { scroll: false });
          }}
        >
          회원가입
        </button>

        <Link href="/forgot-password" className="text-[#99A2A5]">
          비밀번호 찾기
        </Link>
      </div>

      {/* 제출 버튼 */}
      <BlankBar />
      <div className="flex justify-center ">
        <Button styleType="thunder_full" onClick={handleSubmit}>
          로그인
        </Button>
      </div>
      <BlankBar />
    </div>
  );
}

export default SigninForm;

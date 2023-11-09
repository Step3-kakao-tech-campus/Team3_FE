"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import InputBox from "@/components/molecules/InputBox";
import Logo from "public/images/bowling_logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlankBar from "@/components/atoms/BlankBar";
import { validateEmail, validatePassword } from "@/utils/validation";

import { setLogin } from "@/utils/user";
import { postLogin } from "@/apis/sign";
import { useMutation } from "@tanstack/react-query";
import useApiErrorToast from "@/hooks/useApiErrorToast";

function SigninForm(): JSX.Element {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const { addApiErrorToast } = useApiErrorToast();

  const { mutate } = useMutation(postLogin);

  const handleInputChange = (fieldName: any, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = useCallback(() => {
    if (!formData.email || !formData.password) {
      setErrMsg("모든 항목을 입력해주세요.");
    } else if (!validateEmail(formData.email)) {
      setErrMsg("이메일 형식이 올바르지 않습니다.");
    } else if (!validatePassword(formData.password)) {
      setErrMsg("비밀번호는 영문,숫자, 특수문자가 모두 포함 8자 이상 20자 이하로 입력해주세요.");
    } else {
      mutate(formData, {
        onSuccess: (res) => {
          setLogin(res.headers.authorization);
          router.back();
          router.refresh();
        },
        onError: (err) => {
          addApiErrorToast({ err, alt: "회원가입 요청이 실패했습니다." });
        },
      });
    }
  }, [formData, mutate, router, addApiErrorToast]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
    },
    [handleSubmit],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div>
      <div className="flex items-center justify-center pb-[22px]">
        <Image src={Logo} alt="볼링 로고" width={50} height={50} />
        <h1 className="text-[40px] text-transparent bg-clip-text bg-thunder md:text-2xl">번개볼링</h1>
      </div>

      <div>
        {/* 이메일 입력란 */}
        <InputBox
          inputs={[
            {
              type: "email",
              placeholder: "이메일(아이디)",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm",
            },
            {
              type: "password",
              placeholder: "비밀번호",
              className: "w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm",
            },
          ]}
          onInputChange={handleInputChange}
        />
      </div>
      <div>
        <p className="text-[#ff003e] text-sm whitespace-pre-line">{errMsg}</p>
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
        <Button styleType="thunder" rounded="full" size="lg" onClick={handleSubmit}>
          로그인
        </Button>
      </div>
      <BlankBar />
    </div>
  );
}

export default SigninForm;

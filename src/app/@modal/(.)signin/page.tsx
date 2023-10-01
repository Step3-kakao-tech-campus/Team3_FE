"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import InputBox from "@/components/molecules/InputBox";
import Logo from "public/images/bowling_logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlankBar from "@/components/atoms/BlankBar";
import { validateEmail, validatePassword } from "@/utils/validation";

import { login } from "@/apis/postUser";
import { setLogin, getTokenPayload, deleteToken } from "@/utils/user";
import { islogin, setExpiryDate } from "@/redux/features/counterSlice";
import { useAppDispatch } from "@/redux/hooks";

function SigninHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    required: "",
  });

  const errorMessagesArray = Object.values(errorMessage).filter((message) => message);
  const firstErrorMessage = errorMessagesArray[0];

  const handleInputChange = (fieldName: any, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setErrorMessage((prevData) => ({
        ...prevData,
        required: "모든 항목을 입력해주세요.",
      }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, required: "" }));

    if (!validateEmail(formData.email)) {
      setErrorMessage((prevData) => ({
        ...prevData,
        email: "이메일 형식이 올바르지 않습니다.",
      }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, email: "" }));

    if (!validatePassword(formData.password)) {
      setErrorMessage((prevData) => ({
        ...prevData,
        password: "비밀번호는 8자 이상이어야 합니다.",
      }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, password: "" }));

    try {
      const response = await login(formData);
      const payload = getTokenPayload(response.headers.authorization);
      // 토큰 만료시간 설정
      dispatch(islogin(formData.email));
      dispatch(setExpiryDate(payload.exp));
      if (payload === null) {
        deleteToken();
        return;
      }
      console.log(payload.exp);
      setLogin(formData.email, response.headers.authorization);

      router.back();
    } catch (e: any) {
      if (e.response) {
        alert(e.response.data.errorMessage);
      }
      router.back();
    }
    router.refresh();
  };

  return (
    <Modal>
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
          <p className="text-red-500 text-sm whitespace-pre-line">{firstErrorMessage}</p>
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
        <div className="flex justify-center ">
          {/* <Button style="yellow" onClick={handleButtonClick} className="w-[546px] h-[60px] rounded-full text-xl">
            카카오 로그인
          </Button> */}
        </div>
      </div>
    </Modal>
  );
}

export default SigninHome;

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

import { login } from "@/apis/user";
import { setLogin } from "@/utils/user";

function SigninHome() {
  const router = useRouter();
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
    // You can access the form data in the formData object.
    try {
      const response = await login(formData);

      setLogin(formData.email, response.headers.authorization);
    } catch (e) {
      console.log(e);
    }
    console.log(formData);
    // Perform your signup logic here.
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

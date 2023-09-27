"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import AuthCheckbox from "@/components/atoms/AuthCheckBox";
import Modal from "@/components/atoms/Modal";
import InputBox from "@/components/molecules/InputBox";
import DropdownBox from "@/components/molecules/DropdownBox";
import { validateEmail, validatePassword, validateName } from "@/utils/validation";
import Logo from "public/images/bowling_logo.png";
import BlankBar from "@/components/atoms/BlankBar";

import { register } from "@/apis/user";

function SignupHome() {
  const [consentChecked, setConsentChecked] = useState(false); // 동의 체크 상태
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    districtId: 26,
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
      await register(formData);
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
                placeholder: "이메일",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
                validate: validateEmail,
              },
              {
                type: "name",
                placeholder: "닉네임",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
                validate: validateName,
              },
              {
                type: "password",
                placeholder: "비밀번호",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
                validate: validatePassword,
              },
              {
                type: "password",
                placeholder: "비밀번호 확인",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
              },
            ]}
            onInputChange={handleInputChange} // Pass the input change handler
          />
        </div>
        {/* 지역 선택 */}
        <DropdownBox />

        <BlankBar />
        {/* 개인 정보 수집 및 이용 동의 체크박스 */}
        <div className="mb-4">
          <AuthCheckbox checked={consentChecked} onChange={(isChecked) => setConsentChecked(isChecked)} />
        </div>
        <BlankBar />
        {/* 제출 버튼 */}
        <div className="flex justify-center">
          <Button styleType="thunder_full" onClick={handleSubmit}>
            회원가입
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SignupHome;

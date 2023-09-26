"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import ConsentCheckbox from "@/components/atoms/CheckBox";
import Dropdown from "@/components/atoms/Dropdown";
import Modal from "@/components/atoms/Modal";
import InputBox from "@/components/molecules/InputBox";
import { validateEmail, validatePassword, validateName } from "@/utils/validation";

function SignupHome() {
  const createOption = (value: string) => ({ value, label: value });

  const options1 = [createOption("광역시 / 도"), createOption("서울특별시"), createOption("부산광역시")];

  const options2 = [createOption("시 / 군 / 구"), createOption("남구"), createOption("북구")];

  const options3 = [createOption("동 / 면 / 읍"), createOption("장전동"), createOption("부저동")];

  const [selectedOption1, setSelectedOption1] = useState(options1[0].value);
  const [selectedOption2, setSelectedOption2] = useState(options2[0].value);
  const [selectedOption3, setSelectedOption3] = useState(options3[0].value);
  const [consentChecked, setConsentChecked] = useState(false); // 동의 체크 상태

  const handleDropdownChange1 = (selectedValue: any) => {
    setSelectedOption1(selectedValue);
  };

  const handleDropdownChange2 = (selectedValue: any) => {
    setSelectedOption2(selectedValue);
  };

  const handleDropdownChange3 = (selectedValue: any) => {
    setSelectedOption3(selectedValue);
  };

  const handleButtonClick = () => {
    console.log("회원가입 버튼 클릭");
  };
  return (
    <Modal>
      <div className="">
        <div className="flex items-center justify-center pb-[44px]">
          <Image src="/logo.png" width={100} height={100} alt="logo" />
          <h1 className="text-[60px] text-transparent bg-clip-text bg-thunder">번개볼링</h1>
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
                type: "text",
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
          />
        </div>
        {/* 지역 선택 */}

        <div className="flex justify-between">
          <Dropdown
            options={options1}
            selectedValue={selectedOption1}
            onChange={handleDropdownChange1}
            className="w-[180px]" // Adjust the width as needed
          />

          <Dropdown
            options={options2}
            selectedValue={selectedOption2}
            onChange={handleDropdownChange2}
            className="w-[180px]" // Adjust the width as needed
          />

          <Dropdown
            options={options3}
            selectedValue={selectedOption3}
            onChange={handleDropdownChange3}
            className="w-[180px]" // Adjust the width as needed
          />
        </div>
        <p className="pb-[32px]" />
        {/* 개인 정보 수집 및 이용 동의 체크박스 */}
        <div className="mb-4">
          <ConsentCheckbox checked={consentChecked} onChange={(isChecked) => setConsentChecked(isChecked)} />
        </div>
        <p className="pb-[32px]" />
        {/* 제출 버튼 */}
        <div className="flex justify-center ">
          <Button style="thunder" onClick={handleButtonClick} className="w-[546px] h-[60px] rounded-full text-xl">
            회원가입
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SignupHome;

"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Dropdown from "@/components/atoms/Dropdown";

import { useState } from "react";

export default function Box() {
  const options = [
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "옵션 3" },
  ];
  interface SelectedOptions {
    [key: string]: string;
  }

  const [selectedOptions, setSelectedOptions] = useState({
    dropdown1: options[0].value,
    dropdown2: options[0].value,
    dropdown3: options[0].value,
  });

  const handleDropdownChange = (selectedValue: string, dropdownName: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [dropdownName]: selectedValue,
    });
  };

  return (
    <div className='bg-white w-[546px] h-[795px] p-[50px]'>
      <div className='flex items-center pb-[44px]'>
        <Image src='/logo.png' width={100} height={100} alt='logo' />
        <h1 className='text-[60px]'>번개볼링</h1>
      </div>

      <div>
        {/* 이메일 입력란 */}
        <div className='mb-4'>
          {Input("email", "email", "닉네임", "w-full py-2 px-3 rounded-lg border border-gray-400")}
        </div>
        <p className='pb-[32px]' />
        {/* 닉네임 입력란 */}
        <div className='mb-4'>
          {Input("nickname", "text", "이메일", "w-full py-2 px-3 rounded-lg border border-gray-400")}
        </div>
        <p className='pb-[32px]' />
        {/* 비밀번호 입력란 */}
        <div className='mb-4'>
          {Input("password", "password", "비밀번호", "w-full py-2 px-3 rounded-lg border border-gray-400")}
        </div>
        <p className='pb-[32px]' />
        {/* 비밀번호 확인 입력란 */}
        <div className='mb-4'>
          {Input("confirmPassword", "password", "비밀번호 확인", " w-full py-2 px-3 rounded-lg border border-gray-400")}
        </div>
      </div>
      {/* 지역 선택 */}
      <div className='flex'>
        <Dropdown
          options={options}
          selectedOption={selectedOptions.dropdown1}
          onChange={(value) => handleDropdownChange(value, "dropdown1")}
        />

        <Dropdown
          options={options}
          selectedOption={selectedOptions.dropdown2}
          onChange={(value) => handleDropdownChange(value, "dropdown1")}
        />
      </div>

      {/* 제출 버튼 */}
      <div className='flex justify-center '>
        {Button(
          "submit",
          "bg-gradient-to-tl from-[#FE7E07] to-[#FFDE67] text-white w-[546px] h-[60px] rounded-full",
          "회원가입"
        )}
      </div>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

export default function Box() {
  return (
    <div className="bg-white w-[546px] h-[795px] p-[50px]">
      <div className="flex items-center pb-[44px]">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <h1 className="text-[60px]">번개볼링</h1>
      </div>

      <div>
        {/* 이메일 입력란 */}
        <div className="mb-4">
          {Input('email', 'email', '닉네임', 'w-full py-2 px-3 rounded-lg border border-gray-400')}
        </div>
        <p className="pb-[32px]" />
        {/* 닉네임 입력란 */}
        <div className="mb-4">
          {Input('nickname', 'text', '이메일', 'w-full py-2 px-3 rounded-lg border border-gray-400')}
        </div>
        <p className="pb-[32px]" />
        {/* 비밀번호 입력란 */}
        <div className="mb-4">
          {Input('password', 'password', '비밀번호', 'w-full py-2 px-3 rounded-lg border border-gray-400')}
        </div>
        <p className="pb-[32px]" />
        {/* 비밀번호 확인 입력란 */}
        <div className="mb-4">
          {Input('confirmPassword', 'password', '비밀번호 확인', ' w-full py-2 px-3 rounded-lg border border-gray-400')}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-center ">
        {Button(
          'submit',
          'bg-gradient-to-tl from-[#FE7E07] to-[#FFDE67] text-white w-[546px] h-[60px] rounded-full',
          '회원가입'
        )}
      </div>
    </div>
  );
}

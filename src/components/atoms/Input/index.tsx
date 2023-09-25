'use client';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface Props {
  id: string;
  type: string;
  placeholder: string;
  className: string;
}

function Input({ id, type, placeholder, className }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  // 비밀번호 필드인 경우에만 숨기기/보이기 버튼 추가
  const isPasswordField = type === 'password' || type === 'confirmPassword';

  // 비밀번호를 감추거나 보여주는 함수
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <input
        id={id}
        type={isPasswordField && isVisible ? 'text' : type}
        placeholder={placeholder}
        className={className}
      />
      {isPasswordField && (
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={toggleVisibility}
          style={{
            width: '24px', // 아이콘의 너비 조정
            height: '24px', // 아이콘의 높이 조정
          }}
        >
          {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}
    </div>
  );
}

export default Input;

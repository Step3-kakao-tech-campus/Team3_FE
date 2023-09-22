import React from 'react';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

export default function ConsentCheckbox({ checked, onChange }: ConsentCheckboxProps) {
  return (
    <div className="flex items-center space-x-2 text-sm cursor-pointer" onClick={() => onChange(!checked)}>
      {checked ? <AiFillCheckCircle color="#2196F3" size={16} /> : <AiOutlineCheckCircle color="#2196F3" size={16} />}
      &nbsp;번개볼링의&nbsp;
      <a href="/service-terms" style={{ color: '#2196F3', textDecoration: 'underline' }}>
        서비스 이용 약관
      </a>
      &nbsp;및&nbsp;
      <a href="/privacy-policy" style={{ color: '#2196F3', textDecoration: 'underline' }}>
        개인 정보 수집 및 이용
      </a>
      에 동의합니다.
    </div>
  );
}

import Link from "next/link";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";

interface Props {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

function AuthCheckbox({ checked, onChange }: Props) {
  return (
    <button
      type="button"
      className="flex items-center space-x-2 text-sm cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      {checked ? (
        <AiFillCheckCircle className="text-[#2196F3] text-base" />
      ) : (
        <AiOutlineCheckCircle className="text-[#2196F3] text-base" />
      )}
      &nbsp;번개볼링의&nbsp;
      <Link href="/service-terms" className="text-[#2196F3] underline">
        서비스 이용 약관
      </Link>
      &nbsp;및&nbsp;
      <Link href="/privacy-policy" className="text-[#2196F3] underline">
        개인 정보 수집 및 이용
      </Link>
      에 동의합니다.
    </button>
  );
}

export default AuthCheckbox;

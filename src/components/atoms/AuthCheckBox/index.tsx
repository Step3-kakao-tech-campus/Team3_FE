import Link from "next/link";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";

interface Props {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

function AuthCheckbox({ checked, onChange }: Props): JSX.Element {
  return (
    <div className="flex items-center md:w-[300px]">
      <button type="button" className="cursor-pointer text-xl md:text-base" onClick={() => onChange(!checked)}>
        {checked ? (
          <AiFillCheckCircle className="inline-block text-[#2196F3]" />
        ) : (
          <AiOutlineCheckCircle className="inline-block text-[#2196F3]" />
        )}
      </button>
      <p className="md:text-xs">
        &nbsp;번개볼링의&nbsp;
        <Link href="/service-terms" className="text-[#2196F3] underline">
          서비스 이용 약관
        </Link>
        &nbsp;및&nbsp;
        <Link href="/privacy-policy" className="text-[#2196F3] underline">
          개인 정보 수집 및 이용
        </Link>
        에 동의합니다.
      </p>
    </div>
  );
}

export default AuthCheckbox;

import Link from "next/link";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";

interface Props {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

function ConsentCheckbox({ checked, onChange }: Props) {
  return (
    <button
      type="button"
      className="flex items-center space-x-2 text-sm cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      {checked ? <AiFillCheckCircle color="#2196F3" size={16} /> : <AiOutlineCheckCircle color="#2196F3" size={16} />}
      &nbsp;번개볼링의&nbsp;
      <Link href="/service-terms" style={{ color: "#2196F3", textDecoration: "underline" }}>
        서비스 이용 약관
      </Link>
      &nbsp;및&nbsp;
      <Link href="/privacy-policy" style={{ color: "#2196F3", textDecoration: "underline" }}>
        개인 정보 수집 및 이용
      </Link>
      에 동의합니다.
    </button>
  );
}

export default ConsentCheckbox;

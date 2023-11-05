"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

function BackArrowButton(): JSX.Element {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return <MdArrowBack onClick={handleBack} className="w-[30px] h-[30px] cursor-pointer" />;
}

export default BackArrowButton;

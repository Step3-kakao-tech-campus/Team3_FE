"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

function BackArrowButton() {
  const router = useRouter();
  const handleBack = () => {
    router.refresh();
    router.push("/");
  };
  return <MdArrowBack onClick={handleBack} size="30" className="cursor-pointer" />;
}

export default BackArrowButton;

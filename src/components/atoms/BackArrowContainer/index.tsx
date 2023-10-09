"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

interface Props {
  children: React.ReactNode;
}

function BackArrowContainer({ children }: Props) {
  const router = useRouter();
  const handleBack = () => {
    router.refresh();
    router.push("/");
  };
  return (
    <div className="mt-8 p-16 bg-white lg:mx-28">
      <MdArrowBack onClick={handleBack} size="30" className="cursor-pointer" />
      {children}
    </div>
  );
}

export default BackArrowContainer;

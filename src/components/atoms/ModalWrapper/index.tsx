"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

interface Props {
  children: React.ReactNode;
  noPadding?: boolean;
}

function ModalWrapper({ children, noPadding }: Props): JSX.Element {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="fixed z-50 left-0 right-0 top-0 bottom-0 flex items-center justify-center ">
      <div
        className={`relative bg-white rounded-2xl border-[#868484] shadow-2xl overflow-clip ${
          noPadding ? "p-0" : "p-6"
        }`}
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold rounded-full w-7 h-7 flex items-center justify-center focus:outline-none"
          onClick={onDismiss}
          aria-label="Modal Close"
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;

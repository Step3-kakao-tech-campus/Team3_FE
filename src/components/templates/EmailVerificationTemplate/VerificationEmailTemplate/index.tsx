"use client";

import Image from "next/image";
import Link from "next/link";

function VerificationEmailTemplate() {
  return (
    <div className="email-verification-error min-h-[60vh] flex flex-col justify-evenly">
      <div className="flex flex-col items-center gap-8 md:gap-4">
        <Image alt="번개볼링 로고 이미지" src="/images/bowling_logo.png" width={120} height={120} />
        <h2 className="text-3xl md:text-xl">메일 인증이 성공적으로 완료되었습니다.</h2>
        <p className="text-center text-xl md:text-base text-neutral-500">
          번개볼링에서 볼링을 함께 할 친구를 찾아보세요.
        </p>
        <Link href="/" className="text-white border px-4 py-1 rounded-lg bg-thunder hover:brightness-95">
          홈으로
        </Link>
      </div>
    </div>
  );
}

export default VerificationEmailTemplate;

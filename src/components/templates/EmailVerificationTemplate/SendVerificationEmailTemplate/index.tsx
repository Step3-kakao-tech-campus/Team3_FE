"use client";

import { MdCheckCircle } from "react-icons/md";
import Link from "next/link";
import { UseMutateFunction } from "@tanstack/react-query";

interface Prop {
  sendMail: UseMutateFunction;
}

function SendVerificationEmailTemplate({ sendMail }: Prop): JSX.Element {
  return (
    <div className="email-verification-error min-h-[60vh] flex flex-col justify-evenly">
      <div className="flex flex-col items-center gap-8">
        <MdCheckCircle className="text-8xl text-thunderOrange" />
        <h2 className="text-3xl">인증 메일을 보냈습니다.</h2>
        <div className="email-verification-error flex flex-col items-center gap-3">
          <p className="text-xl text-neutral-500">가입하신 이메일의 메일함을 확인해주세요.</p>
          <p className="text-center text-lg text-neutral-500">
            이메일 확인이 이루어지지 않을 경우, 일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </div>
        <p className="text-center text-neutral-500">
          이메일을 확인할 수 없나요? 스팸 메일함을 확인하거나 이메일 재발송 버튼을 눌러주세요.
        </p>
        <div className="flex gap-4 text-lg">
          <button
            type="button"
            className="text-neutral-600 border px-4 py-1 rounded-lg bg-white hover:brightness-95"
            onClick={() => sendMail()}
          >
            이메일 재발송
          </button>
          <Link href="/" className="text-white border px-4 py-1 rounded-lg bg-thunder hover:brightness-95">
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SendVerificationEmailTemplate;

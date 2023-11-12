"use client";

import SendVerificationEmailTemplate from "@/components/templates/EmailVerificationTemplate/SendVerificationEmailTemplate";
import { useEffect } from "react";
import { postSendVerificationEmail } from "@/apis/email";
import { useMutation } from "@tanstack/react-query";

import EmailAirplane from "@/components/atoms/EmailAirplane";

function EmailSendPage() {
  const { mutate, isSuccess, isLoading } = useMutation(postSendVerificationEmail, { useErrorBoundary: true });

  useEffect(mutate, []);

  if (!isSuccess || isLoading)
    return (
      <div className="relative flex flex-col justify-center items-center h-[60vh] overflow-hidden gap-20 md:gap-12">
        <EmailAirplane />
        <span className="text-3xl md:text-xl">인증 메일을 전송 중입니다.</span>
      </div>
    );
  return <SendVerificationEmailTemplate sendMail={mutate} />;
}

export default EmailSendPage;

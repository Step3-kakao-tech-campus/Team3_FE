"use client";

import SendVerificationEmailTemplate from "@/components/templates/EmailVerificationTemplate/SendVerificationEmailTemplate";
import { useEffect } from "react";
import { postSendVerificationEmail } from "@/apis/email";
import { useMutation } from "@tanstack/react-query";
import DefaultLoadingUI from "@/components/templates/DefaultLoadingUI";

function EmailSendPage() {
  const { mutate, isSuccess, isLoading } = useMutation(postSendVerificationEmail, { useErrorBoundary: true });

  useEffect(mutate, []);

  if (!isSuccess || isLoading) return <DefaultLoadingUI />;
  return <SendVerificationEmailTemplate sendMail={mutate} />;
}

export default EmailSendPage;

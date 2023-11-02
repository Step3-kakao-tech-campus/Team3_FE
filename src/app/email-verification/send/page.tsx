"use client";

import SendVerificationEmailTemplate from "@/components/templates/EmailVerificationTemplate/SendVerificationEmailTemplate";
import { useEffect } from "react";
import { postSendVerificationEmail } from "@/apis/email";
import { useMutation } from "@tanstack/react-query";
import EmailVerificationLoading from "../loading";

function EmailSendPage() {
  const { mutate, isSuccess } = useMutation(postSendVerificationEmail, { useErrorBoundary: true });

  useEffect(mutate, []);

  if (!isSuccess) return <EmailVerificationLoading />;
  return <SendVerificationEmailTemplate />;
}

export default EmailSendPage;

"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { postConfirmVerificationEmail } from "@/apis/email";
import VerificationEmailTemplate from "@/components/templates/EmailVerificationTemplate/VerificationEmailTemplate";
import { useSearchParams } from "next/navigation";
import DefaultLoadingUI from "@/components/templates/DefaultLoadingUI";

function EmailVerificationPage() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token") as string;
  const { mutate, isSuccess } = useMutation(postConfirmVerificationEmail, { useErrorBoundary: true });

  useEffect(() => {
    mutate({ token });
  }, []);

  if (!isSuccess) return <DefaultLoadingUI />;
  return <VerificationEmailTemplate />;
}

export default EmailVerificationPage;

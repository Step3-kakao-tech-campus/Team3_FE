"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { postConfirmVerificationEmail } from "@/apis/email";
import VerificationEmailTemplate from "@/components/templates/EmailVerificationTemplate/VerificationEmailTemplate";
import { useSearchParams } from "next/navigation";
import DefaultLoadingUI from "@/components/templates/DefaultLoadingUI";
import postAuthentication from "@/apis/auth";
import { deleteToken, setLogin } from "@/utils/user";

function EmailVerificationPage() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token") as string;

  const { mutate: callNewTokenApi, isSuccess: getTokenIsSuccess } = useMutation(postAuthentication, {
    useErrorBoundary: true,
    onSuccess: (res) => {
      setLogin(res.headers.authorization);
    },
    onError: () => {
      deleteToken();
      alert("다시 로그인이 필요합니다.");
      window.location.href = "/";
    },
  });
  const { mutate, isSuccess } = useMutation(postConfirmVerificationEmail, {
    useErrorBoundary: true,
    onSuccess: () => callNewTokenApi(),
  });

  useEffect(() => {
    mutate({ token });
  }, []);

  if (!isSuccess && !getTokenIsSuccess) return <DefaultLoadingUI />;
  return <VerificationEmailTemplate />;
}

export default EmailVerificationPage;

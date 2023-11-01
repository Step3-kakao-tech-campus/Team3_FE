"use client";

import useIsMounted from "@/hooks/useMounted";
import EmailVerificationLoading from "./loading";

function EmailVerificationPage() {
  const { isMounted } = useIsMounted();
  if (!isMounted) return <EmailVerificationLoading />;
  return <div>EmailVerificationPage</div>;
}

export default EmailVerificationPage;

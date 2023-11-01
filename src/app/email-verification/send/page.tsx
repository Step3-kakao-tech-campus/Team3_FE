"use client";

import useIsMounted from "@/hooks/useMounted";
import EmailVerificationLoading from "../loading";

function EmailSendPage() {
  const { isMounted } = useIsMounted();
  if (!isMounted) return <EmailVerificationLoading />;
  return <div>EmailSendPage</div>;
}

export default EmailSendPage;

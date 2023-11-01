import WhiteContainer from "@/components/atoms/WhiteContainer";
import React from "react";

interface Props {
  children: React.ReactNode;
}
function EmailVerificationLayout({ children }: Props): JSX.Element {
  return <WhiteContainer>{children}</WhiteContainer>;
}

export default EmailVerificationLayout;

import React from "react";

import RoutingModalWrapper from "@/components/atoms/RoutingModalWrapper";
import SigninForm from "@/components/organisms/SigninForm";

function SigninHome() {
  return (
    <RoutingModalWrapper>
      <SigninForm />
    </RoutingModalWrapper>
  );
}

export default SigninHome;

import React from "react";

import RoutingModalWrapper from "@/components/atoms/RoutingModalWrapper";
import SignupForm from "@/components/organisms/SignupForm";

function SignupHome() {
  return (
    <RoutingModalWrapper>
      <SignupForm />
    </RoutingModalWrapper>
  );
}

export default SignupHome;

import React from "react";

import SignupForm from "@/components/organisms/SignupForm";
import WhiteContainer from "@/components/atoms/WhiteContainer";

function SignupHome() {
  return (
    <WhiteContainer>
      <div className="max-w-lg mx-auto">
        <SignupForm />
      </div>
    </WhiteContainer>
  );
}

export default SignupHome;

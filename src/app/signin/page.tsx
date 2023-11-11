import React from "react";

import SigninForm from "@/components/organisms/SigninForm";
import WhiteContainer from "@/components/atoms/WhiteContainer";

function SigninHome() {
  return (
    <WhiteContainer>
      <div className="max-w-lg mx-auto">
        <SigninForm />
      </div>
    </WhiteContainer>
  );
}

export default SigninHome;

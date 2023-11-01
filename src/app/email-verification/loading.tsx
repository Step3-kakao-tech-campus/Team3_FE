import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import WhiteContainer from "@/components/atoms/WhiteContainer";

function EmailVerificationLoading() {
  return (
    <WhiteContainer>
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner styleType="xl" />
      </div>
    </WhiteContainer>
  );
}

export default EmailVerificationLoading;

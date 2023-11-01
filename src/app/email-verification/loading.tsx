import LoadingSpinner from "@/components/atoms/LoadingSpinner";

function EmailVerificationLoading() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <LoadingSpinner styleType="xl" />
    </div>
  );
}

export default EmailVerificationLoading;

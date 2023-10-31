import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

function MyPageLoading() {
  return (
    <BackArrowContainer>
      <div className="min-h-[512px] flex flex-col items-center">
        <LoadingSpinner />
      </div>
    </BackArrowContainer>
  );
}

export default MyPageLoading;

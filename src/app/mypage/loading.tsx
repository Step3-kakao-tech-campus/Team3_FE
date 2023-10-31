import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

function MyPageLoading() {
  return (
    <BackArrowContainer>
      <LoadingSpinner />
    </BackArrowContainer>
  );
}

export default MyPageLoading;

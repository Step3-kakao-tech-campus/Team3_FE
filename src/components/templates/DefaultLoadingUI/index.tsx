import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import WhiteContainer from "@/components/atoms/WhiteContainer";

function DefaultLoadingUI() {
  return (
    <WhiteContainer>
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingSpinner styleType="xl" />
      </div>
    </WhiteContainer>
  );
}

export default DefaultLoadingUI;

import LoadingSpinner from "@/components/atoms/LoadingSpinner";

function MyPageLoading() {
  return (
    <div className="min-h-[512px] flex flex-col items-center">
      <LoadingSpinner />
    </div>
  );
}

export default MyPageLoading;

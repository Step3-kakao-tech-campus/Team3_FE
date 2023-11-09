import useResetErrorWithQuery from "@/hooks/useResetErrorWithQuery";
import ModalLayout from "../ModalLayout";

function ErrorModal() {
  const { reset } = useResetErrorWithQuery();
  return (
    <ModalLayout>
      <div className="error-modal flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl">오류가 발생했습니다.</h1>
        <div className="email-verification-error flex flex-col items-center gap-3">
          <p className="text-base text-neutral-500">아래의 버튼을 눌러 다시 시도해 주세요.</p>
        </div>
        <button
          type="button"
          className="border bg-thunder px-4 py-2 text-white rounded-2xl hover:brightness-95"
          onClick={() => reset()}
        >
          다시 시도
        </button>
      </div>
    </ModalLayout>
  );
}

export default ErrorModal;

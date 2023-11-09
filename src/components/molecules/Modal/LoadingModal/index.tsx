import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ModalLayout from "../ModalLayout";

function LoadingModal() {
  return (
    <ModalLayout>
      <LoadingSpinner />
    </ModalLayout>
  );
}

export default LoadingModal;

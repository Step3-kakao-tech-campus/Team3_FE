import { StarRatingModalProps } from "@/types/starRatingModalProps";
import StarRatingTemplate from "@/components/templates/StarRatingTemplate";
import SuspenseErrorBoundary from "@/components/atoms/SuspenseErrorBoundary";
import ModalWrapper from "..";
import ErrorModal from "../ErrorModal";
import LoadingModal from "../LoadingModal";

function StarRatingModal({ postId, applicantId, targetId, onDismiss }: StarRatingModalProps) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <SuspenseErrorBoundary errorFallback={<ErrorModal />} suspenseFallback={<LoadingModal />}>
        <StarRatingTemplate postId={postId} applicantId={applicantId} targetId={targetId} onDismiss={onDismiss} />
      </SuspenseErrorBoundary>
    </ModalWrapper>
  );
}

export default StarRatingModal;

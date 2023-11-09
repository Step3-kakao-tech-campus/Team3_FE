import ScoreEditTemplate from "@/components/templates/ScoreEditTemplate";
import SuspenseErrorBoundary from "@/components/atoms/SuspenseErrorBoundary";
import ModalWrapper from "..";
import ErrorModal from "../ErrorModal";
import LoadingModal from "../LoadingModal";

function ScoreEditModal({ postId, onDismiss }: { postId: number; onDismiss: () => void }) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <SuspenseErrorBoundary errorFallback={<ErrorModal />} suspenseFallback={<LoadingModal />}>
        <ScoreEditTemplate postId={postId} />
      </SuspenseErrorBoundary>
    </ModalWrapper>
  );
}

export default ScoreEditModal;

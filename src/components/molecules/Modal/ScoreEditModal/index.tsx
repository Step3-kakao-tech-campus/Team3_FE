import ScoreEditTemplate from "@/components/templates/ScoreEditTemplate";
import { Suspense } from "react";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ModalWrapper from "..";

function ScoreEditModal({ postId, onDismiss }: { postId: number; onDismiss: () => void }) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <Suspense fallback={<LoadingSpinner />}>
        <ScoreEditTemplate postId={postId} />
      </Suspense>
    </ModalWrapper>
  );
}

export default ScoreEditModal;

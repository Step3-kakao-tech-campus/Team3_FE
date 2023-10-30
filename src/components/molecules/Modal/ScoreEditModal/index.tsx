import ScoreEditTemplate from "@/components/templates/ScoreEditTemplate";
import ModalWrapper from "..";

function ScoreEditModal({ postId, onDismiss }: { postId: number; onDismiss: () => void }) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <ScoreEditTemplate postId={postId} />
    </ModalWrapper>
  );
}

export default ScoreEditModal;

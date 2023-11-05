import { StarRatingModalProps } from "@/types/starRatingModalProps";
import StarRatingTemplate from "@/components/templates/StarRatingTemplate";
import ModalWrapper from "..";

function StarRatingModal({ postId, applicantId, targetId, onDismiss }: StarRatingModalProps) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <StarRatingTemplate postId={postId} applicantId={applicantId} targetId={targetId} onDismiss={onDismiss} />
    </ModalWrapper>
  );
}

export default StarRatingModal;

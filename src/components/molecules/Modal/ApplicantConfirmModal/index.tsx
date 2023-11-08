"use client";

import ApplicantConfirmTemplate from "@/components/templates/ApplicantConfirmTemplate";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import SuspenseErrorBoundary from "@/components/atoms/SuspenseErrorBoundary";
import ModalWrapper from "..";

interface Props {
  postId: number;
  onDismiss: () => void;
}

function ApplicantConfirmModal({ postId, onDismiss }: Props) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <SuspenseErrorBoundary errorFallback={<div>Error Fallback</div>} suspenseFallback={<LoadingSpinner />}>
        <ApplicantConfirmTemplate postId={postId} />
      </SuspenseErrorBoundary>
    </ModalWrapper>
  );
}

export default ApplicantConfirmModal;

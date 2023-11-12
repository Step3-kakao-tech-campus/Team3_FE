"use client";

import ApplicantConfirmTemplate from "@/components/templates/ApplicantConfirmTemplate";
import SuspenseErrorBoundary from "@/components/atoms/SuspenseErrorBoundary";
import ModalWrapper from "..";
import ErrorModal from "../ErrorModal";
import LoadingModal from "../LoadingModal";

interface Props {
  postId: number;
  onDismiss: () => void;
}

function ApplicantConfirmModal({ postId, onDismiss }: Props) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <SuspenseErrorBoundary errorFallback={<ErrorModal />} suspenseFallback={<LoadingModal />}>
        <ApplicantConfirmTemplate postId={postId} />
      </SuspenseErrorBoundary>
    </ModalWrapper>
  );
}

export default ApplicantConfirmModal;

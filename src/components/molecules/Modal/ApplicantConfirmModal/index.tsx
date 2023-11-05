"use client";

import ApplicantConfirmTemplate from "@/components/templates/ApplicantConfirmTemplate";
import React, { Suspense } from "react";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ModalWrapper from "..";

interface Props {
  postId: number;
  onDismiss: () => void;
}

function ApplicantConfirmModal({ postId, onDismiss }: Props) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <Suspense fallback={<LoadingSpinner />}>
        <ApplicantConfirmTemplate postId={postId} />
      </Suspense>
    </ModalWrapper>
  );
}

export default ApplicantConfirmModal;

"use client";

import ApplicantConfirmTemplate from "@/components/templates/ApplicantConfirmTemplate";
import React from "react";
import ModalWrapper from "..";

interface Props {
  postId: number;
  onDismiss: () => void;
}

function ApplicantConfirmModal({ postId, onDismiss }: Props) {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <ApplicantConfirmTemplate postId={postId} />
    </ModalWrapper>
  );
}

export default ApplicantConfirmModal;

"use client";

import React from "react";
import ProfileModalTemplate from "@/components/templates/ProfileModalTemplate";
import { useRecoilState } from "recoil";
import profileModalState from "@/stores/atoms/profileModalState";

import SuspenseErrorBoundary from "@/components/atoms/SuspenseErrorBoundary";
import ModalWrapper from "..";
import ErrorModal from "../ErrorModal";
import LoadingModal from "../LoadingModal";

function ProfileModal(): JSX.Element | null {
  const [profileModal, setProfileModal] = useRecoilState(profileModalState);
  if (profileModal.isOpen)
    return (
      <ModalWrapper
        noPadding
        onDismiss={() => {
          setProfileModal({ isOpen: false });
        }}
      >
        <SuspenseErrorBoundary errorFallback={<ErrorModal />} suspenseFallback={<LoadingModal />}>
          <ProfileModalTemplate userId={profileModal.userId!} />
        </SuspenseErrorBoundary>
      </ModalWrapper>
    );
  return null;
}

export default ProfileModal;

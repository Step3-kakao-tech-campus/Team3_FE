"use client";

import React from "react";
import ProfileModalTemplate from "@/components/templates/ProfileModalTemplate";
import { useRecoilState } from "recoil";
import profileModalState from "@/stores/atoms/profileModalState";

import ModalWrapper from "..";

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
        <ProfileModalTemplate userId={profileModal.userId!} />
      </ModalWrapper>
    );
  return null;
}

export default ProfileModal;

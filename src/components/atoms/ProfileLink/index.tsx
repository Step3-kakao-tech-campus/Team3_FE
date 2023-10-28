import profileModalState from "@/stores/atoms/profileModalState";
import React from "react";
import { useSetRecoilState } from "recoil";

interface Props {
  children: React.ReactNode;
  className?: string;
  userId: number;
}

function ProfileLink({ children, className, userId }: Props): JSX.Element {
  const setProfileModal = useSetRecoilState(profileModalState);

  return (
    <button
      type="button"
      className={`pointer ${className}`}
      onClick={() => {
        setProfileModal({ isOpen: true, userId });
      }}
    >
      {children}
    </button>
  );
}

export default ProfileLink;

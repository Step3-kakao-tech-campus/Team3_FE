import React from "react";
import SearchModalTemplate from "@/components/templates/SearchModalTemplate";
import ModalWrapper from "..";
interface Props {
  onDismiss: () => void;
}

function UserSearchModal({ onDismiss }: Props): JSX.Element {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <SearchModalTemplate />
    </ModalWrapper>
  );
}

export default UserSearchModal;

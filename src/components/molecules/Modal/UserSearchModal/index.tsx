import React from "react";
import SearchModalTemplate from "@/components/templates/SearchModalTemplate";
import ErrorBoundaryWithQuery from "@/components/atoms/ErrorBoundaryWithQuery";
import ModalWrapper from "..";
import ErrorModal from "../ErrorModal";

interface Props {
  onDismiss: () => void;
}

function UserSearchModal({ onDismiss }: Props): JSX.Element {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <ErrorBoundaryWithQuery fallback={<ErrorModal />}>
        <SearchModalTemplate />
      </ErrorBoundaryWithQuery>
    </ModalWrapper>
  );
}

export default UserSearchModal;

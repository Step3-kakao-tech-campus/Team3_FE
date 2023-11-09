import React from "react";
import SearchModalTemplate from "@/components/templates/SearchModalTemplate";
import SuspenseErrorBoundary from "@/components/atoms/SuspenseErrorBoundary";
import ModalWrapper from "..";
import ErrorModal from "../ErrorModal";
import LoadingModal from "../LoadingModal";

interface Props {
  onDismiss: () => void;
}

function UserSearchModal({ onDismiss }: Props): JSX.Element {
  return (
    <ModalWrapper onDismiss={onDismiss}>
      <SuspenseErrorBoundary errorFallback={<ErrorModal />} suspenseFallback={<LoadingModal />}>
        <SearchModalTemplate />
      </SuspenseErrorBoundary>
    </ModalWrapper>
  );
}

export default UserSearchModal;

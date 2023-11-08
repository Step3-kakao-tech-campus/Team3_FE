import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useErrorBoundary } from "react-error-boundary";

export default function useResetErrorWithQuery() {
  const { resetBoundary } = useErrorBoundary();
  const { reset: resetQuery } = useQueryErrorResetBoundary();
  const reset = () => {
    resetQuery();
    resetBoundary();
  };

  return { reset, resetBoundary, resetQuery };
}

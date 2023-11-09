import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  fallback: React.ReactElement;
  children: React.ReactNode;
}

function ErrorBoundaryWithQuery({ fallback, children }: Props) {
  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}

export default ErrorBoundaryWithQuery;

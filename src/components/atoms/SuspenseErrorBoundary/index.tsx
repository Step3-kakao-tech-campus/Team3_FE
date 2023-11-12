import React, { Suspense } from "react";
import ErrorBoundaryWithQuery from "../ErrorBoundaryWithQuery";

interface Prop {
  children: React.ReactNode;
  suspenseFallback: React.ReactNode;
  errorFallback: React.ReactElement;
}

function SuspenseErrorBoundary({ children, suspenseFallback, errorFallback }: Prop) {
  return (
    <ErrorBoundaryWithQuery fallback={errorFallback}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundaryWithQuery>
  );
}

export default SuspenseErrorBoundary;

import React from "react";

function ModalLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center w-72 h-40">{children}</div>;
}

export default ModalLayout;

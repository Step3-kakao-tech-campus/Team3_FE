import React from "react";

function ModalLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center w-64 h-40">{children}</div>;
}

export default ModalLayout;

import React from "react";

interface Props {
  children?: React.ReactNode;
}

function SemiModalContainer({ children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
      <div className="w-[400px] h-[200px] bg-white border-[#868484] shadow-2xl md:w-[300px] md:h-[150px]">
        {children}
      </div>
    </div>
  );
}

export default SemiModalContainer;

import React from "react";
import SemiModalContainer from "..";

interface Props {
  handleComplete: () => void;
  handleCancel: () => void;
}

function ReconfirmModal({ handleComplete, handleCancel }: Props): JSX.Element {
  return (
    <SemiModalContainer>
      <div className="h-full">
        <div className="h-[75%] p-10 border-b border-slate-300">
          <h2 className="mb-4 text-lg font-bold">메시지 삭제</h2>
          <p>메시지를 삭제하시겠습니까?</p>
        </div>
        <div className="flex h-[25%]">
          <button
            type="button"
            className="flex-1 border-r border-slate-300 text-slate-600 hover:text-black"
            onClick={handleComplete}
          >
            확인
          </button>
          <button type="button" className="flex-1 text-slate-600 hover:text-black" onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </SemiModalContainer>
  );
}

export default ReconfirmModal;

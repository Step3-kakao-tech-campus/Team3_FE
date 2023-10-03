"use client";

import Button from "@/components/atoms/Button";

function ApplicantConfirmTemplate() {
  return (
    <div className="applicant-confirm flex flex-col gap-4 text-center w-[500px]">
      <h1 className="text-2xl">신청자 확인</h1>
      <div className="applicant-number-with-button flex justify-between items-center">
        <span>총 4건의 신청 요청이 있습니다.</span>
        <Button styleType="thunder_full_sm">마감하기</Button>
      </div>
      <div className="applicant-list">신청자리스트</div>
    </div>
  );
}
export default ApplicantConfirmTemplate;

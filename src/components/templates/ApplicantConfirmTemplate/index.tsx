"use client";

import { getApplicants } from "@/apis/applicant";
import Button from "@/components/atoms/Button";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ApplicantBlock from "@/components/molecules/ApplicantBlock";
import { Applicant } from "@/types/applicant";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";

function ApplicantConfirmTemplate(): JSX.Element {
  const pageParam = useParams();
  const postId = parseInt(pageParam.post_id as string, 10);
  const { data, isLoading, isError, error }: any = useQuery(["getApplicants", postId], {
    queryFn: () => getApplicants(postId),
  });

  const response = data?.data?.response;

  const errorComponent = useMemo(
    () => (
      <span className="error-message text-xl text-neutral-400 my-auto">
        {error?.response?.data?.errorMessage || "에러가 발생했습니다."}
      </span>
    ),
    [error?.response?.data?.errorMessage],
  );
  const noApplicantComponent = useMemo(
    () => <div className="no-applicant text-xl text-neutral-400 my-auto">신청자가 없습니다.</div>,
    [],
  );

  const renderComponent = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (isError) {
      return errorComponent;
    }
    if (response?.participantNumber === 0) {
      return noApplicantComponent;
    }
    return response?.applicants?.map((applicant: Applicant) => {
      return <ApplicantBlock key={applicant.id} applicantData={applicant} postId={postId} />;
    });
  }, [
    errorComponent,
    isError,
    isLoading,
    noApplicantComponent,
    postId,
    response?.applicants,
    response?.participantNumber,
  ]);

  return (
    <div className="applicant-confirm flex flex-col gap-4 text-center w-[500px]">
      <h1 className="text-2xl">신청자 확인</h1>
      {!isError && (
        <div className="applicant-number-with-button flex justify-between items-center">
          <span>총 {response?.participantNumber}건의 신청 요청이 있습니다.</span>
          <Button styleType="thunder" size="sm" rounded="full">
            마감하기
          </Button>
        </div>
      )}
      <div className="applicant-list flex flex-col gap-3 max-h-[400px] min-h-[100px] overflow-y-auto">
        {renderComponent()}
      </div>
    </div>
  );
}
export default ApplicantConfirmTemplate;

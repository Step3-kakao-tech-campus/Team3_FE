"use client";

import { getApplicants } from "@/apis/applicant";
import { patchPost } from "@/apis/posts";
import Button from "@/components/atoms/Button";
import ApplicantBlock from "@/components/molecules/ApplicantBlock";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import useToast from "@/hooks/useToast";
import { Applicant } from "@/types/applicant";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface Props {
  postId: number;
}

function ApplicantConfirmTemplate({ postId }: Props): JSX.Element {
  const { data, isError, error }: any = useQuery(["getApplicants", postId], {
    queryFn: () => getApplicants(postId),
    suspense: true,
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
    if (isError) {
      return errorComponent;
    }
    if (response?.applicantNumber === 0) {
      return noApplicantComponent;
    }
    return response?.applicants?.map((applicant: Applicant) => {
      return <ApplicantBlock key={applicant.id} applicantData={applicant} postId={postId} />;
    });
  }, [errorComponent, isError, noApplicantComponent, postId, response?.applicants, response?.applicantNumber]);

  const { addErrorToast, addSuccessToast } = useToast();
  const { mutate: handleClose, queryClient } = useMutateWithQueryClient(patchPost);
  const mutateOption = {
    onError: () => {
      addErrorToast("요청에 실패했습니다. 다시 시도해주세요");
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`/api/posts/${postId}`, postId]);
      addSuccessToast("마감되었습니다.");
    },
  };

  return (
    <div className="applicant-confirm flex flex-col gap-4 text-center w-[500px] md:w-[300px]">
      <h1 className="text-2xl md:text-xl">신청자 확인</h1>
      {!isError && (
        <div className="applicant-number-with-button flex justify-between items-center">
          <span>총 {response?.applicantNumber}건의 신청 요청이 있습니다.</span>
          <Button styleType="thunder" size="sm" rounded="full" onClick={() => handleClose(postId, mutateOption)}>
            모집완료
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

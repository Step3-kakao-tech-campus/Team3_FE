"use client";

import { getApplicants } from "@/apis/application";
import Button from "@/components/atoms/Button";
import ApplicantBlock from "@/components/molecules/ApplicantBlock";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback } from "react";

interface Applicant {
  id: number;
  user: {
    id: number;
    name: string;
    profileImage: string;
    rating: number;
  };
  status: boolean;
}

function ApplicantConfirmTemplate() {
  const pageParam = useParams();
  const postId = parseInt(pageParam.post_id as string, 10);
  const { data, isLoading, isError, error }: any = useQuery(["getApplicants", pageParam.post_id], {
    queryFn: () => getApplicants(postId),
  });

  const response = data?.data?.response;

  const renderComponent = useCallback(() => {
    if (isLoading) {
      return <span className="loading text-xl text-neutral-400 my-auto">로딩중입니다.</span>;
    }
    if (isError) {
      return (
        <span className="error-message text-xl text-neutral-400 my-auto">
          {error?.response?.data?.errorMessage || "에러가 발생했습니다."}
        </span>
      );
    }
    if (response?.participantNumber === 0) {
      return <div className="no-applicant text-xl text-neutral-400 my-auto">신청자가 없습니다.</div>;
    }
    return response?.applicants?.map((applicant: Applicant) => {
      const user = applicant?.user;
      return (
        <ApplicantBlock
          key={applicant.id}
          name={user.name}
          profileImage={user.profileImage}
          rating={user.rating}
          postId={postId}
        />
      );
    });
  }, [
    error?.response?.data?.errorMessage,
    isError,
    isLoading,
    postId,
    response?.applicants,
    response?.participantNumber,
  ]);

  return (
    <div className="applicant-confirm flex flex-col gap-4 text-center w-[500px]">
      <h1 className="text-2xl">신청자 확인</h1>
      <div className="applicant-number-with-button flex justify-between items-center">
        <span>총 {response?.participantNumber}건의 신청 요청이 있습니다.</span>
        <Button styleType="thunder_full_sm">마감하기</Button>
      </div>
      <div className="applicant-list flex flex-col gap-3 max-h-[400px] min-h-[100px] overflow-y-auto">
        {renderComponent()}
      </div>
    </div>
  );
}
export default ApplicantConfirmTemplate;

"use client";

import getApplicants from "@/apis/application";
import Button from "@/components/atoms/Button";
import ApplicantBlock from "@/components/molecules/ApplicantBlock";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
  const { data, isError, error }: any = useQuery(["getApplicants", pageParam.post_id], {
    queryFn: () => getApplicants(parseInt(pageParam.post_id as string, 10)),
  });

  const response = data?.data?.response;

  if (isError) {
    return (
      <div className="applicant-confirm-error py-6 px-2 min-w-[400px] text-center items-center  ">
        <span className="error-message text-2xl">{error?.response?.data?.errorMessage}</span>
      </div>
    );
  }
  return (
    <div className="applicant-confirm flex flex-col gap-4 text-center w-[500px]">
      <h1 className="text-2xl">신청자 확인</h1>
      <div className="applicant-number-with-button flex justify-between items-center">
        <span>총 {response?.participantNumber}건의 신청 요청이 있습니다.</span>
        <Button styleType="thunder_full_sm">마감하기</Button>
      </div>
      <div className="applicant-list flex flex-col gap-3 max-h-[400px] overflow-auto">
        {response?.participantNumber ? (
          response?.applicants?.map((applicant: Applicant) => {
            const user = applicant?.user;
            return (
              <ApplicantBlock
                key={applicant.id}
                name={user.name}
                profileImage={user.profileImage}
                rating={user.rating}
              />
            );
          })
        ) : (
          <span className="text-xl text-neutral-400">신청자가 없습니다.</span>
        )}
      </div>
    </div>
  );
}
export default ApplicantConfirmTemplate;

import { deleteRejectApplicant, putAcceptApplicant } from "@/apis/applicant";
import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import useToast from "@/hooks/useToast";
import ProfileLink from "@/components/atoms/ProfileLink";
import { Applicant } from "@/types/applicant";
import { useCallback, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { useMutation } from "@tanstack/react-query";
import useApiErrorToast from "@/hooks/useApiErrorToast";

interface Prop {
  postId: number;
  applicantData: Applicant;
}

function ApplicantBlock({ postId, applicantData }: Prop): JSX.Element {
  const { user, status: isAccept, id: applicantId } = applicantData;
  const [approvalStatus, setApprovalStatus] = useState(isAccept ? "accepted" : "pending");

  const { addSuccessToast } = useToast();
  const { addApiErrorToast } = useApiErrorToast();

  const { mutate: acceptApiCall, queryClient } = useMutateWithQueryClient(putAcceptApplicant);
  const { mutate: rejectApiCall } = useMutation(deleteRejectApplicant);

  const handleAccept = useCallback(async () => {
    acceptApiCall(
      { postId, applicantId },
      {
        onSuccess: () => {
          setApprovalStatus("accepted");
          queryClient.invalidateQueries(["getApplicants", postId]);
          addSuccessToast("수락되었습니다.");
        },
        onError: (err) => {
          addApiErrorToast({ err, alt: "수락 요청이 실패했습니다." });
        },
      },
    );
  }, [acceptApiCall, postId, applicantId, queryClient, addSuccessToast, addApiErrorToast]);

  const handleReject = useCallback(async () => {
    rejectApiCall(
      { postId, applicantId },
      {
        onSuccess: () => {
          setApprovalStatus("rejected");
          queryClient.invalidateQueries(["getApplicants", postId]);
          addSuccessToast("거절되었습니다.");
        },
        onError: (err) => {
          addApiErrorToast({ err, alt: "거절 요청이 실패했습니다." });
        },
      },
    );
  }, [rejectApiCall, postId, applicantId, queryClient, addSuccessToast, addApiErrorToast]);

  return (
    <div className="applicant flex items-center justify-between border rounded-2xl py-2 px-4 md:px-2">
      <div className="user-info flex gap-2 items-center">
        <ProfileLink userId={user.id}>
          <CircularProfileImage src={user.profileImage} styleType="lg" />
        </ProfileLink>
        <div className="user-info-text flex flex-col justify-start">
          <ProfileLink userId={user.id}>
            <span className="block w-fit font-bold text-slate-700 hover:underline">{user.name}</span>
          </ProfileLink>
          <span className="block w-fit text-sm text-neutral-500">{`매너점수 ★ ${
            user.rating ? `${user.rating.toFixed(1)}/5` : "없음"
          }`}</span>
        </div>
      </div>
      <div className="confirm-control flex gap-3 md:gap-1.5">
        {approvalStatus === "accepted" && (
          <span className="text-green-500 flex items-center">
            <MdCheck className="inline" />
            수락됨
          </span>
        )}
        {approvalStatus === "rejected" && (
          <span className="text-red-500 flex items-center">
            <MdClose className="inline" />
            거절됨
          </span>
        )}
        {approvalStatus === "pending" && (
          <>
            <Button styleType="outlined-gray" size="sm" rounded="full" onClick={() => handleReject()}>
              <span className="block text-sm font-normal min-w-[40px] leading-none fontsize md:min-w-[34px]">거절</span>
            </Button>
            <Button styleType="thunder" size="sm" rounded="full" onClick={() => handleAccept()}>
              <span className="block text-sm font-normal min-w-[40px] md:min-w-[34px]">수락</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ApplicantBlock;

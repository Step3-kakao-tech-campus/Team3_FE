import { deleteRejectApplicant, putAcceptApplicant } from "@/apis/applicant";
import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import { Applicant } from "@/types/applicant";
import { useCallback, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";

interface Prop {
  postId: number;
  applicantData: Applicant;
}

function ApplicantBlock({ postId, applicantData }: Prop) {
  const { user, status: isAccept, id: applicantId } = applicantData;
  const [approvalStatus, setApprovalStatus] = useState(isAccept ? "accepted" : "pending");

  const handleAcceptReject = useCallback(
    async (type: "accept" | "reject") => {
      if (type === "accept") {
        try {
          await putAcceptApplicant(postId, applicantId);
          setApprovalStatus("accepted");
        } catch {
          alert("수락 요청이 실패했습니다.");
        }
      } else {
        try {
          await deleteRejectApplicant(postId, applicantId);
          setApprovalStatus("rejected");
        } catch {
          alert("거절 요청이 실패했습니다.");
        }
      }
    },
    [postId, applicantId],
  );

  return (
    <div className="applicant flex items-center justify-between border rounded-2xl py-2 px-4">
      <div className="user-info flex gap-2 items-center">
        <CircularProfileImage src={user.profileImage} styleType="lg" />
        <div className="user-info-text flex flex-col justify-start">
          <span className="block w-fit font-bold text-slate-700">{user.name}</span>
          <span className="block w-fit text-sm text-neutral-500">{`매너점수 ★ ${
            user.rating ? `${user.rating}/5` : "없음"
          }`}</span>
        </div>
      </div>
      <div className="confirm-control flex gap-3">
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
            <Button styleType="outlined-gray" size="sm" rounded="full" onClick={() => handleAcceptReject("reject")}>
              <span className="block text-sm font-normal min-w-[40px] leading-none fontsize">거절</span>
            </Button>
            <Button styleType="thunder" size="sm" rounded="full" onClick={() => handleAcceptReject("accept")}>
              <span className="block text-sm font-normal min-w-[40px]">수락</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ApplicantBlock;

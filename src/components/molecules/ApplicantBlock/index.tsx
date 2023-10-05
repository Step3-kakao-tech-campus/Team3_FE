import Button from "@/components/atoms/Button";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";

interface ApplicantData {
  name: string;
  profileImage: string;
  rating: number;
  postId: number;
}

function ApplicantBlock({ name, profileImage, rating, postId }: ApplicantData) {
  return (
    <div className="applicant flex items-center justify-between border rounded-2xl py-2 px-4">
      <div className="user-info flex gap-2 items-center">
        <CircularProfileImage src={profileImage} styleType="lg" />
        <div className="user-info-text flex flex-col justify-start">
          <span className="block w-fit font-bold text-slate-700">{name}</span>
          <span className="block w-fit text-sm text-neutral-500">{`매너점수 ★ ${
            rating ? `${rating}/5` : "없음"
          }`}</span>
        </div>
      </div>
      <div className="confirm-control flex gap-3">
        <Button styleType="outlined_gray_full_sm">
          <span className="block text-sm font-normal min-w-[40px] leading-none fontsize">마감</span>
        </Button>
        <Button styleType="thunder_full_sm">
          <span className="block text-sm font-normal min-w-[40px]">수락</span>
        </Button>
      </div>
    </div>
  );
}

export default ApplicantBlock;

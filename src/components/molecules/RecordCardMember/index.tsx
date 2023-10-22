/* eslint-disable @typescript-eslint/no-use-before-define */
import Button from "@/components/atoms/Button";
import { RecordData } from "@/types/recordData";
import ModalLink from "@/components/atoms/ModalLink";
import MiniProfile from "../MiniProfile";

interface Prop {
  member: RecordData["members"][number];
  isMyRecord: boolean;
  clientUserId: number;
  scoresLength: number;
  applicantId: number;
  postId: number;
}

function RecordCardMember({ member, isMyRecord, clientUserId, scoresLength, applicantId, postId }: Prop): JSX.Element {
  return (
    <div className="member flex gap-4 items-center">
      <MiniProfile userId={member.id} userName={member.name} imageSrc={member.profileImage} />
      {isMyRecord &&
        clientUserId === member.id &&
        (scoresLength ? (
          <Button size="xs" rounded="full" styleType="outlined-blue" fontWeight="normal">
            <ModalLink href={`/score_edit/${postId}`}>수정하기</ModalLink>
          </Button>
        ) : (
          <Button size="xs" rounded="full" styleType="filled-blue" fontWeight="normal">
            <ModalLink href={`/score_edit/${postId}`}>점수등록</ModalLink>
          </Button>
        ))}
      {isMyRecord &&
        clientUserId !== member.id &&
        (member.isRated ? (
          <Button size="xs" rounded="full" styleType="outlined-gray" fontWeight="normal">
            완료
          </Button>
        ) : (
          <Button size="xs" rounded="full" styleType="outlined-orange" fontWeight="normal">
            <ModalLink href={`/star_rating/${applicantId}/${member.id}`}>별점주기</ModalLink>
          </Button>
        ))}
    </div>
  );
}

export default RecordCardMember;

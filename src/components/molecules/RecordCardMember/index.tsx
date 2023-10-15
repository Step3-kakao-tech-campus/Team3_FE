/* eslint-disable @typescript-eslint/no-use-before-define */
import Button from "@/components/atoms/Button";
import { RecordData } from "@/types/recordData";
import MiniProfile from "../MiniProfile";

interface Prop {
  member: RecordData["members"][number];
  isMyRecord: boolean;
  clientUserId: number;
  scoresLength: number;
}

function RecordCardMember({ member, isMyRecord, clientUserId, scoresLength }: Prop): JSX.Element {
  return (
    <div className="member flex gap-4 items-center">
      <MiniProfile userId={member.id} userName={member.name} imageSrc={member.profileImage} />
      {isMyRecord &&
        clientUserId === member.id &&
        (scoresLength ? (
          <Button size="xs" rounded="full" styleType="outlined-blue" fontWeight="normal">
            수정하기
          </Button>
        ) : (
          <Button size="xs" rounded="full" styleType="filled-blue" fontWeight="normal">
            점수등록
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
            별점주기
          </Button>
        ))}
    </div>
  );
}

export default RecordCardMember;

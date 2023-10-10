/* eslint-disable @typescript-eslint/no-use-before-define */
import Button, { ButtonProps } from "@/components/atoms/Button";
import MiniProfile from "../MiniProfile";

function RecordCardMember({
  member,
  isMyRecord,
  clientUserId,
  scoresLength,
}: {
  member: {
    id: number;
    name: string;
    profileImage: string | null;
    isRated: boolean;
  };
  isMyRecord: boolean;
  clientUserId: number;
  scoresLength: number;
}) {
  return (
    <div className="member flex gap-4 items-center">
      <MiniProfile userId={member.id} userName={member.name} imageSrc={member.profileImage} />
      {isMyRecord &&
        clientUserId === member.id &&
        (scoresLength ? (
          <MyButton styleType="outlined-blue">수정하기</MyButton>
        ) : (
          <MyButton styleType="filled-blue">점수등록</MyButton>
        ))}
      {isMyRecord &&
        clientUserId !== member.id &&
        (member.isRated ? (
          <MyButton styleType="outlined-gray">완료</MyButton>
        ) : (
          <MyButton styleType="outlined-orange">별점주기</MyButton>
        ))}
    </div>
  );
}

export default RecordCardMember;

interface MyButtonProp {
  children: ButtonProps["children"];
  styleType: ButtonProps["styleType"];
  onClick?: ButtonProps["onClick"];
}

function MyButton({ children, styleType, onClick }: MyButtonProp) {
  return (
    <Button
      size="sm"
      rounded="full"
      styleType={styleType}
      fontSize="sm"
      fontWeight="normal"
      minWidth="70px"
      padding="px-2_py-[3px]"
      noLineHeight
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

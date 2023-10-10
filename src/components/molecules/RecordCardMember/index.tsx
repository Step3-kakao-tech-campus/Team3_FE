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
  const commonButtonStyle =
    "h-fit min-w-[70px] border text-sm leading-none rounded-full px-2 py-[3px] hover:brightness-95";
  const buttonStyles = {
    "outlined-gray": `border-neutral-400 text-neutral-400 bg-white ${commonButtonStyle}`,
    "outlined-orange": `border-thunderOrange text-thunderOrange bg-white ${commonButtonStyle}`,
    "outlined-blue": `border-blue-400 text-blue-400 bg-white ${commonButtonStyle}`,
    "filled-blue": `text-white bg-blue-500 ${commonButtonStyle}`,
  };
  return (
    <div className="member flex gap-4 items-center">
      <MiniProfile userId={member.id} userName={member.name} imageSrc={member.profileImage} />
      {isMyRecord &&
        clientUserId === member.id &&
        (scoresLength ? (
          <button type="button" className={buttonStyles["outlined-blue"]}>
            수정하기
          </button>
        ) : (
          <button type="button" className={buttonStyles["filled-blue"]}>
            점수등록
          </button>
        ))}
      {isMyRecord &&
        clientUserId !== member.id &&
        (member.isRated ? (
          <button type="button" className={buttonStyles["outlined-gray"]}>
            완료
          </button>
        ) : (
          <button type="button" className={buttonStyles["outlined-orange"]}>
            별점주기
          </button>
        ))}
    </div>
  );
}

export default RecordCardMember;

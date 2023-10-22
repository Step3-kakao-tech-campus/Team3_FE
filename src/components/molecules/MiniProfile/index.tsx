import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ModalLink from "@/components/atoms/ModalLink";

interface Prop {
  userId: number;
  imageSrc: string | null;
  userName: string;
  size?: "md" | "sm";
}

function MiniProfile({ userId, imageSrc, userName, size = "md" }: Prop): JSX.Element {
  const fontSize = { md: "text-xl", sm: "text-base" };
  return (
    <ModalLink href={`/user_profile/${userId}`} className="inline-flex gap-1 items-center">
      <CircularProfileImage src={imageSrc} styleType={size} />
      <span className={`user-name ${fontSize[size]}`}>{userName}</span>
    </ModalLink>
  );
}

export default MiniProfile;

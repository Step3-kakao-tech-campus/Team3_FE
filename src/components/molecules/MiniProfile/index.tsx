import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import ProfileLink from "@/components/atoms/ProfileLink";

interface Prop {
  userId: number;
  imageSrc: string | null;
  userName: string;
  size?: "md" | "sm";
}

function MiniProfile({ userId, imageSrc, userName, size = "md" }: Prop): JSX.Element {
  const fontSize = { md: "text-xl md:text-sm", sm: "text-base" };
  return (
    <ProfileLink userId={userId} className="inline-flex gap-1 items-center">
      <CircularProfileImage src={imageSrc} styleType={size} />
      <span className={`user-name ${fontSize[size]}`}>{userName}</span>
    </ProfileLink>
  );
}

export default MiniProfile;

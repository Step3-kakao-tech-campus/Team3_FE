import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import Link from "next/link";

interface Prop {
  userId: number;
  imageSrc: string | null;
  userName: string;
}

function MiniProfile({ userId, imageSrc, userName }: Prop): JSX.Element {
  return (
    <Link href={`/user_profile/${userId}`} className="inline-flex gap-1 items-center">
      <CircularProfileImage src={imageSrc} />
      <span className="user-name text-xl">{userName}</span>
    </Link>
  );
}

export default MiniProfile;

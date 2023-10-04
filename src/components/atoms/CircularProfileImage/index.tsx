import Image from "next/image";

interface Props {
  src: string | null;
  className?: string;
}

function CircularProfileImage({ src, className = "h-8 w-8" }: Props) {
  return (
    <div className={`profile-image rounded-full overflow-hidden ${className}`}>
      <Image
        alt="유저 프로필 이미지"
        src={src ? `임시APIURL${src}` : "/images/default_profile_image.png"}
        width={100}
        height={100}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default CircularProfileImage;

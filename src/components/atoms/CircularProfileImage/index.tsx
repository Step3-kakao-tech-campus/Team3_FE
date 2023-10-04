import Image from "next/image";

interface Props {
  src: string | null;
  className?: string;
}

/**
 * 원형 유저 프로필 이미지 컴포넌트.
 * className으로 tailwind 키워드를 전달받을 수 있어, 추후 반응형 스타일 적용이 원활하도록 했다.
 * 기본 사이즈는 32*32px이다.
 */
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

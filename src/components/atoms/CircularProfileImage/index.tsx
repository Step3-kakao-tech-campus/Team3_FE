import Image from "next/image";

interface Props {
  src: string | null;
  /**
    lg: "w-10 h-10",
    md: "w-8 h-8",
    sm: "w-6 h-6",
   */
  styleType?: "lg" | "md" | "sm";
}

/**
 * 원형 유저 프로필 이미지 컴포넌트.
 * className으로 tailwind 키워드를 전달받을 수 있어, 추후 반응형 스타일 적용이 원활하도록 했다.
 * 기본 사이즈는 32*32px이다.
 */
function CircularProfileImage({ src, styleType = "md" }: Props) {
  const styles = {
    lg: "w-10 h-10",
    md: "w-8 h-8",
    sm: "w-6 h-6",
  };
  return (
    <div className={`profile-image rounded-full overflow-hidden roun ${styles[styleType]}`}>
      <Image
        alt="유저 프로필 이미지"
        src={src || "/images/default_profile_image.png"}
        width={100}
        height={100}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default CircularProfileImage;

import Image from "next/image";

interface Props {
  src: string | null;
  /**
    lg: "w-10 h-10",
    md: "w-8 h-8",
    sm: "w-6 h-6",
   */
  styleType?: "huge" | "xl" | "lg" | "md" | "sm";
}

/**
 * 원형 유저 프로필 이미지 컴포넌트.
 * styleType으로 크기를 전달받는다
 * huge: "w-20 h-20",
 * xl: "w-12 h-12",
 * lg: "w-10 h-10",
 * md: "w-8 h-8",
 * sm: "w-6 h-6",
 * 기본 사이즈는 'md': 32*32px이다.
 */
function CircularProfileImage({ src, styleType = "md" }: Props): JSX.Element {
  const styles = {
    huge: "w-20 h-20",
    xl: "w-12 h-12",
    lg: "w-10 h-10",
    md: "w-8 h-8",
    sm: "w-6 h-6",
  };
  return (
    <div className={`profile-image rounded-full overflow-hidden ${styles[styleType]}`}>
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

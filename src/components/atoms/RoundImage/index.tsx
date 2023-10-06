import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className: string;
}

function RoundImage({ src, alt, className }: Props) {
  return (
    <div className={`profile-image relative rounded-full overflow-hidden ${className}`}>
      <Image alt={alt} src={src} fill />
    </div>
  );
}

export default RoundImage;

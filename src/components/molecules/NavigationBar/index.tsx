import InnerContainer from "@/components/atoms/InnerContainer";
import Image from "next/image";
import Logo from "public/images/bowling_logo.png";
import Link from "next/link";
import AuthButton from "../AuthButton";

function NavigationBar(): JSX.Element {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white">
      <InnerContainer>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center mr-4">
              <Image src={Logo} alt="볼링 로고" width={45} height={45} />
              <span className="text-2xl font-bold bg-clip-text bg-thunder text-transparent">번개볼링</span>
            </div>
            <Link href="/" className="hover:underline">
              홈
            </Link>
            <Link href="/" className="hover:underline">
              볼링장 찾기
            </Link>
          </div>
          <AuthButton />
        </div>
      </InnerContainer>
    </nav>
  );
}

export default NavigationBar;

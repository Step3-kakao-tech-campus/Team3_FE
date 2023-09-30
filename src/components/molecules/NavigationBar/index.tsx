"use client";

import InnerContainer from "@/components/atoms/InnerContainer";
import Image from "next/image";
import Logo from "public/images/bowling_logo.png";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";

import { logout } from "@/utils/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { islogout } from "@/redux/features/counterSlice";

function NavigationBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.email);

  // componentDidUpdate() 메서드에서 userEmail이 변경되었는지 검사하고 user 상태를 업데이트

  return (
    <nav className="fixed top-0 inset-x-0 z-999 bg-white">
      <InnerContainer>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center mr-4">
              <Image src={Logo} alt="볼링 로고" width={45} height={45} />
              <span className="text-2xl font-bold bg-clip-text bg-thunder text-transparent">번개볼링</span>
            </div>
            <Link href="/">홈</Link>
            <Link href="/">볼링장 찾기</Link>
          </div>

          <div className="flex items-center space-x-4">
            {email ? (
              <div>
                <span className="mr-2 text-sm text-gray-500">{email.split("@")[0]}님</span>
                <Button
                  styleType="white"
                  onClick={() => {
                    dispatch(islogout());
                    logout();
                    router.push("/", { scroll: false });
                  }}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  styleType="white"
                  onClick={() => {
                    router.push("/signin", { scroll: false });
                  }}
                >
                  로그인
                </Button>
                <Button
                  styleType="thunder"
                  onClick={() => {
                    router.push("/signup", { scroll: false });
                  }}
                >
                  회원가입
                </Button>
              </div>
            )}
          </div>
        </div>
      </InnerContainer>
    </nav>
  );
}

export default NavigationBar;

"use client";

import InnerContainer from "@/components/atoms/InnerContainer";
import Image from "next/image";
import Logo from "public/images/bowling_logo.png";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import { authentication } from "@/apis/postUser";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { islogout, setExpiryDate } from "@/stores/features/counterSlice";
import { useEffect } from "react";
import { setLogin, getTokenPayload, deleteToken } from "@/utils/user";

function NavigationBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const expiryDate = useAppSelector((state) => state.expiryDate);
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn);
  const email = useAppSelector((state) => state.email);

  const auth = async () => {
    alert("만료되었습니다. 토큰을 재 요청합니다.");
    try {
      const res = await authentication();
      const payload = getTokenPayload(res.headers.authorization);
      const expire = payload.exp;
      if (payload === null) {
        deleteToken();
        dispatch(islogout());
        return;
      }
      dispatch(setExpiryDate(expire));
      setLogin(email, res.headers.authorization);
    } catch (e: any) {
      if (e.response) {
        alert(e.response.data.errorMessage);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn && expiryDate) {
      const currentTime = Date.now() / 1000; // 현재 시간(UNIX 타임스탬프)

      if (currentTime >= expiryDate) {
        auth();
        router.push("/", { scroll: false });
      }
    }
  });

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
              <>
                <span className="mr-2 text-sm text-gray-500">{email.split("@")[0]}님</span>
                <Button
                  styleType="white"
                  onClick={async () => {
                    await dispatch(islogout());
                    deleteToken();
                    router.push("/", { scroll: false });
                  }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </InnerContainer>
    </nav>
  );
}

export default NavigationBar;

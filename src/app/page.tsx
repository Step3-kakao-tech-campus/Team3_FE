"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { islogout } from "@/redux/features/counterSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.email);
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn);
  const expiryDate = useAppSelector((state) => state.expiryDate);

  useEffect(() => {
    // strict 모드에서는 개발자모드에서 두번씩 실행되는 문제가 있음
    console.log("email", email);
    console.log("isLoggedIn", isLoggedIn);
    console.log("expiryDate", expiryDate);
    // 만료 기간이 있고 로그인 상태인 경우에만 체크
    if (isLoggedIn && expiryDate) {
      const currentTime = Date.now() / 1000; // 현재 시간(UNIX 타임스탬프)
      console.log("currentTime", currentTime);
      // 만료 기간이 지났다면 로그아웃 처리
      if (currentTime >= expiryDate) {
        console.log("만료 기간이 지났습니다.");
        // 로그아웃 액션을 디스패치하여 상태를 업데이트합니다.
        // 여기서는 예시로 logout 액션을 사용합니다. 실제로는 해당 액션을 만들어야 합니다.
        dispatch(islogout());
      }
    }
  }, [isLoggedIn, expiryDate]); // isLoggedIn 또는 expiryDate가 변경될 때마다 호출

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h1 style={{ marginBottom: 16 }}>{email}</h1>
        <h4 style={{ marginBottom: 16 }}>{isLoggedIn}</h4>
        <h4 style={{ marginBottom: 16 }}>{expiryDate}</h4>
        hello
      </div>
    </main>
  );
}

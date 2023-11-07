"use client";

import MyPageTemplate from "@/components/templates/MyPageTemplate";
import useIsMounted from "@/hooks/useMounted";
import DefaultLoadingUI from "../loading";

function MyPage() {
  const { isMounted } = useIsMounted();
  if (!isMounted) return <DefaultLoadingUI />;
  return <MyPageTemplate />;
}

export default MyPage;

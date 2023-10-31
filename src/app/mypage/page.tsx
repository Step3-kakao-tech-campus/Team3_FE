"use client";

import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import MyPageTemplate from "@/components/templates/MyPageTemplate";
import useIsMounted from "@/hooks/useMounted";
import MyPageLoading from "./loading";

function MyPage() {
  const { isMounted } = useIsMounted();
  if (!isMounted) return <MyPageLoading />;
  return (
    <BackArrowContainer>
      <MyPageTemplate />
    </BackArrowContainer>
  );
}

export default MyPage;

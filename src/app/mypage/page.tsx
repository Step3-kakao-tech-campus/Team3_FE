"use client";

import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import DefaultLoadingUI from "@/components/templates/DefaultLoadingUI";
import MyPageTemplate from "@/components/templates/MyPageTemplate";
import useIsMounted from "@/hooks/useMounted";

function MyPage() {
  const { isMounted } = useIsMounted();
  if (!isMounted) return <DefaultLoadingUI />;
  return (
    <BackArrowContainer>
      <MyPageTemplate />
    </BackArrowContainer>
  );
}

export default MyPage;

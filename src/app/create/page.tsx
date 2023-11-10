"use client";

import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import CreatePostForm from "@/components/organisms/CreatePostForm";
import DefaultLoadingUI from "@/components/templates/DefaultLoadingUI";
import useIsMounted from "@/hooks/useMounted";

function CreateHome() {
  const { isMounted } = useIsMounted();
  if (!isMounted) return <DefaultLoadingUI />;
  return (
    <BackArrowContainer>
      <CreatePostForm />
    </BackArrowContainer>
  );
}

export default CreateHome;

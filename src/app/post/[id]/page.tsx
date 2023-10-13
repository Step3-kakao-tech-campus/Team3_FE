import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import PostTemplates from "@/components/templates/PostTemplates";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

function PostHome({ params }: Props) {
  return (
    <BackArrowContainer>
      <PostTemplates id={params.id} />
    </BackArrowContainer>
  );
}

export default PostHome;

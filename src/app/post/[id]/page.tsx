import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import HydratePostTemplates from "@/components/templates/PostTemplates/HydratePostTemplates";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

function PostHome({ params }: Props) {
  return (
    <BackArrowContainer>
      <HydratePostTemplates id={params.id} />
    </BackArrowContainer>
  );
}

export default PostHome;

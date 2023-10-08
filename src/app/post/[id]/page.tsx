import PostTemplates from "@/components/templates/PostTemplates";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

function PostHome({ params }: Props) {
  return (
    <div className="mt-8 p-16 bg-white lg:mx-28">
      <PostTemplates id={params.id} />
    </div>
  );
}

export default PostHome;

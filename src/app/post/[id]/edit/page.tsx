import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import PostEditForm from "@/components/organisms/PostEditForm";

interface Props {
  params: {
    id: string;
  };
}

function PostEditHome({ params }: Props) {
  return (
    <BackArrowContainer>
      <PostEditForm id={params.id} />
    </BackArrowContainer>
  );
}

export default PostEditHome;

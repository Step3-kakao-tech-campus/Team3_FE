import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import ScoreboardTemplate from "@/components/templates/ScoreboardTemplate";

interface Props {
  params: {
    user_id: number;
  };
}
function ScoreboardPage({ params }: Props) {
  return (
    <BackArrowContainer>
      <ScoreboardTemplate userId={params.user_id} />
    </BackArrowContainer>
  );
}

export default ScoreboardPage;

import Modal from "@/components/atoms/Modal";
import ScoreEditTemplate from "@/components/templates/ScoreEditTemplate";

interface Props {
  params: {
    post_id: string;
  };
}

function ScoreEditPage({ params }: Props) {
  return (
    <Modal>
      <ScoreEditTemplate postId={parseInt(params.post_id, 10)} />
    </Modal>
  );
}

export default ScoreEditPage;

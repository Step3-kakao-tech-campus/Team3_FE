import { deleteScore, deleteScoreImage, postScore, putScore } from "@/apis/record";
import { useMutation } from "@tanstack/react-query";

export default function useScoreMutation({ postOption, putOption, deleteOption, deleteImageOption }: any) {
  const { mutate: postNewScore } = useMutation(postScore, postOption);
  const { mutate: putEditScore } = useMutation(putScore, putOption);
  const { mutate: deleteCurrentScore } = useMutation(deleteScore, deleteOption);
  const { mutate: deleteCurrentScoreImage } = useMutation(deleteScoreImage, deleteImageOption);
  return { postNewScore, putEditScore, deleteCurrentScore, deleteCurrentScoreImage };
}

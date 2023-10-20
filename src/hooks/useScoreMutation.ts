import { deleteScore, postScore, putScore } from "@/apis/record";
import { useMutation } from "@tanstack/react-query";

export default function useScoreMutation({ postOption, putOption, deleteOption }: any) {
  const { mutate: postNewScore } = useMutation(postScore, postOption);
  const { mutate: putEditScore } = useMutation(putScore, putOption);
  const { mutate: deleteCurrentScore } = useMutation(deleteScore, deleteOption);
  return { postNewScore, putEditScore, deleteCurrentScore };
}

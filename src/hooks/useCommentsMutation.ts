import { postComments } from "@/apis/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCommentsMutation() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({ mutationFn: postComments });

  return { mutate, queryClient };
}

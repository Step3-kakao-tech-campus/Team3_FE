import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutateWithQueryClient(fetcher: (arg: any) => Promise<any>) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({ mutationFn: fetcher });

  return { mutate, queryClient };
}

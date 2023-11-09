import queryClient from "@/utils/providers/queryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import CommentForm from "..";

interface Props {
  id: number;
}

async function HydrateCommentForm({ id }: Props) {
  await queryClient.prefetchInfiniteQuery(["/comments", id], async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}/comments`, {
      cache: "no-cache",
    });
    const data = await response.json();

    return { data };
  });

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return (
    <Hydrate state={dehydratedState}>
      <CommentForm id={id} />
    </Hydrate>
  );
}

export default HydrateCommentForm;

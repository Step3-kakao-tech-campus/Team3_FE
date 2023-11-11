import queryClient from "@/utils/providers/queryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import PostTemplates from "..";

interface Props {
  id: string;
}

async function HydratePostTemplates({ id }: Props) {
  const postId = parseInt(id, 10);

  await queryClient.prefetchQuery([`/api/posts/${postId}`, postId], async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    const data = await response.json();

    return { data };
  });

  const prefetchState = queryClient.getQueryState<{
    data: {
      status: number;
    };
  }>([`/api/posts/${postId}`, postId]);

  if (prefetchState?.data?.data?.status !== 200) {
    queryClient.removeQueries([`/api/posts/${postId}`, postId]);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <PostTemplates id={id} />
    </Hydrate>
  );
}

export default HydratePostTemplates;

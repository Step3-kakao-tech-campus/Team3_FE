import queryClient from "@/utils/providers/queryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { PageSearchParams } from "@/types/pageSearchParams";
import React, { Suspense } from "react";
import objectToQueryString from "@/utils/objectToQueryString";
import { PostSearchParam } from "@/types/postSearchParam";
import PostList from "..";
import PostCardSkeleton from "../../PostCard/Skeleton";

async function HydratePostList({ searchParams }: PageSearchParams) {
  await queryClient.prefetchInfiniteQuery(["/api/posts", searchParams], async () => {
    const { cityId = "", countryId = "", districtId = "", all = "" } = searchParams || {};
    const cityIdNum = parseInt(cityId, 10);
    const countryIdNum = parseInt(countryId, 10);
    const districtIdNum = parseInt(districtId, 10);
    const queryParams: PostSearchParam = {};

    if (cityIdNum > 1) queryParams.cityId = cityIdNum;
    if (countryIdNum > 1) queryParams.countryId = countryIdNum;
    if (districtIdNum > 1) queryParams.districtId = districtIdNum;
    if (all === "true" || all === "false") queryParams.all = all;

    const queryString = objectToQueryString(queryParams as Record<string, string | number>);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts${queryString}`, {
      cache: "no-cache",
    });
    const data = await response.json();

    return { data };
  });

  const prefetchState = queryClient.getQueryState<any>(["/api/posts", searchParams]);

  if (prefetchState?.data?.pages[0]?.data?.status !== 200) {
    queryClient.removeQueries(["/api/posts", searchParams]);
  }

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <Hydrate state={dehydratedState}>
        <PostList searchParams={searchParams} />
      </Hydrate>
    </Suspense>
  );
}

export default HydratePostList;

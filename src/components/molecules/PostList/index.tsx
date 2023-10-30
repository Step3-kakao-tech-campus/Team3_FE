"use client";

import { PageSearchParams } from "@/types/pageSearchParams";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostData } from "@/types/postData";
import { useCallback } from "react";
import { getPosts } from "@/apis/posts";
import objectToQueryString from "@/utils/objectToQueryString";
import { PostSearchParam } from "@/types/postSearchParam";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import PostCard from "../PostCard";

function PostList({ searchParams }: PageSearchParams): JSX.Element {
  const getPostList = async ({ pageParam = 0 }, URLSearchParams: URLSearchParams) => {
    const cityId = parseInt(URLSearchParams.get("cityId") || "0", 10);
    const countryId = parseInt(URLSearchParams.get("countryId") || "0", 10);
    const districtId = parseInt(URLSearchParams.get("districtId") || "0", 10);
    const all = URLSearchParams.get("all");
    const queryParams: PostSearchParam = {};
    if (cityId) queryParams.cityId = cityId;
    if (countryId) queryParams.countryId = countryId;
    if (districtId) queryParams.districtId = districtId;
    if (all === "true" || all === "false") queryParams.all = all as string;
    if (pageParam) queryParams.key = pageParam;
    const queryString = objectToQueryString(queryParams as Record<string, string | number>);
    return getPosts(queryString);
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["post_list", searchParams],
    (reactQueryParam) => {
      return getPostList(reactQueryParam, new URLSearchParams(searchParams));
    },
    {
      retry: 2,
      suspense: true,
      getNextPageParam: (lastPage) => {
        const newKey = lastPage?.data?.response?.nextCursorRequest?.key;
        return newKey !== -1 ? newKey : undefined; // 이전 페이지에서 받은 key값이 -1이면 undefined를 리턴하여 hasnextPage를 false로 설정
      },
    },
  );

  const handleIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        if (hasNextPage) {
          await fetchNextPage();
        }
        observer.observe(entry.target);
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const { targetRef } = useIntersectionObserver(handleIntersect);

  return (
    <div className="posts flex flex-col gap-5">
      {data?.pages[0]?.data?.response?.posts?.length ? (
        data?.pages?.map((page) => {
          return page?.data?.response?.posts?.map((post: PostData) => {
            return <PostCard data={post} key={post.id} />;
          });
        })
      ) : (
        <p className="no-post-search-result my-10 text-center center text-2xl text-neutral-500">
          검색된 글이 없습니다. 더 넓은 범위로 검색해 보세요.
        </p>
      )}
      {hasNextPage && <div className="observe-area" ref={targetRef} />}
    </div>
  );
}

export default PostList;

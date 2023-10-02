"use client";

import { PageSearchParams } from "@/types/pageSearchParams";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostData } from "@/types/postData";
import { useCallback, useEffect, useMemo, useRef } from "react";
import getPosts from "@/apis/getPosts";
import PostCard from "../PostCard";

function PostList({ searchParams }: PageSearchParams) {
  const getPostList = async ({ pageParam = 0 }, queryString?: string) => {
    return (await getPosts(`${queryString}${pageParam ? `&key=${pageParam}` : ""}`)).json();
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["post_list", searchParams],
    (reactQueryParam) => {
      return getPostList(reactQueryParam, `?${new URLSearchParams(searchParams).toString()}`);
    },
    {
      retry: 2,
      getNextPageParam: (lastPage) => {
        const newKey = lastPage?.response?.nextCursorRequest?.key;
        return newKey !== -1 ? newKey : undefined; // 이전 페이지에서 받은 key값이 -1이면 undefined를 리턴하여 hasnextPage를 false로 설정
      },
    },
  );

  const target = useRef<HTMLDivElement>(null);

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

  const observer = useMemo(() => new IntersectionObserver(handleIntersect), [handleIntersect]);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, data, observer]);

  return (
    <div className="posts flex flex-col gap-5">
      {data?.pages[0]?.response?.posts?.length ? (
        data?.pages?.map((page) => {
          return page?.response?.posts?.map((post: PostData) => {
            return <PostCard data={post} key={post.id} />;
          });
        })
      ) : (
        <p className="no-post-search-result my-10 text-center center text-2xl text-neutral-500">
          검색된 글이 없습니다. 더 넓은 범위로 검색해 보세요.
        </p>
      )}
      {hasNextPage && <div className="observe-area" ref={target} />}
    </div>
  );
}

export default PostList;

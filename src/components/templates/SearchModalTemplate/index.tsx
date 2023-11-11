"use client";

import { getUsers } from "@/apis/profile";
import UserCard from "@/components/molecules/UserCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { UserData } from "@/types/user";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";

function SearchModalTemplate() {
  const [name, setName] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [`/api/users?${name}`, name],
    ({ pageParam = null }) => getUsers(name as string, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const newKey = lastPage?.data?.response?.nextCursorRequest?.key;
        return newKey !== -1 ? newKey : undefined;
      },
      useErrorBoundary: true,
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
    <div className="w-[350px] md:w-[325px]">
      <h1 className="mt-4 font-bold text-xl text-center">사용자 검색</h1>
      <div className="mt-4">
        <input
          type="text"
          className="w-full py-2 px-3 rounded-lg border border-gray-400 shadow-md"
          placeholder="사용자를 검색해 주세요."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="styled-scroll flex flex-col gap-4 mt-4 p-2 max-h-[400px] overflow-y-auto">
        {data?.pages?.map(
          (page) => page?.data?.response?.users.map((user: UserData) => <UserCard user={user} key={user.id} />),
        )}
        {hasNextPage && <div className="observe-area" ref={targetRef} />}
      </div>
    </div>
  );
}

export default SearchModalTemplate;

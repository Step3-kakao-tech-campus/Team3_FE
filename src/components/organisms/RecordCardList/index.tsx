"use client";

import { getParticipationRecord } from "@/apis/record";
import RecordCard from "@/components/molecules/RecordCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RecordData } from "@/types/recordData";
import { ScoreboardSearchParams } from "@/types/scoreboardSearchParams";
import isValidDateFormatByDash from "@/utils/validDateStringFormat";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useParams, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function RecordCardList(): JSX.Element {
  const params = useParams();
  const searchParams = useSearchParams();
  const pageUserId = parseInt(params.scoreboard_user_id as string, 10) || 0;

  const getRecordList = useCallback(
    async ({ pageParam = 0 }, URLSearchParams: ReadonlyURLSearchParams) => {
      const condition = URLSearchParams.get("condition");
      const status = URLSearchParams.get("status");
      const cityId = parseInt(URLSearchParams.get("cityId") || "0", 10);
      const start = URLSearchParams.get("start");
      const end = URLSearchParams.get("end");
      const queryParams: ScoreboardSearchParams = {};

      const hasCondition = condition === "all" || condition === "created" || condition === "participated";
      const hasStatus = status === "all" || status === "open" || status === "closed";
      const isStartValid = start && isValidDateFormatByDash(start);
      const isEndValid = end && isValidDateFormatByDash(end);

      if (hasCondition) queryParams.condition = condition;
      if (hasStatus) queryParams.status = status;
      if (cityId) queryParams.cityId = cityId;
      if (isStartValid) queryParams.start = start;
      if (isEndValid) queryParams.end = end;
      if (pageParam) queryParams.key = pageParam;

      return getParticipationRecord(pageUserId, queryParams);
    },
    [pageUserId],
  );

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [`/api/posts/users/${pageUserId}/participation-records`, searchParams.toString()],
    (reactQueryParam) => {
      return getRecordList(reactQueryParam, searchParams);
    },
    {
      retry: 2,
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
    <div className="record-card-list flex flex-col gap-5">
      {data?.pages[0]?.data?.response?.posts?.length ? (
        data?.pages?.map((page) => {
          return page?.data?.response?.posts?.map((post: RecordData) => {
            return <RecordCard data={post} key={post.id} />;
          });
        })
      ) : (
        <p className="no-post-search-result my-10 text-center center text-2xl text-neutral-500">
          검색된 참여 기록이 없습니다. 더 넓은 범위로 검색해 보세요.
        </p>
      )}
      {hasNextPage && <div className="observe-area" ref={targetRef} />}
    </div>
  );
}

export default RecordCardList;

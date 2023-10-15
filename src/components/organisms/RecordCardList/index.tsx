"use client";

import getParticipationRecord from "@/apis/record";
import { ScoreboardSearchParams } from "@/types/scoreboardSearchParams";
import isValidDateFormatByDash from "@/utils/validDateStringFormat";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

function RecordCardList(): JSX.Element {
  const params = useParams();
  const searchParams = useSearchParams();
  const pageUserId = parseInt(params.user_id as string, 10);

  const getRecordList = useCallback(
    async ({ pageParam = 0 }, URLSearchParams: ReadonlyURLSearchParams) => {
      const condition = URLSearchParams.get("condition");
      const status = URLSearchParams.get("status");
      const cityId = parseInt(URLSearchParams.get("cityId") || "0", 10);
      const start = URLSearchParams.get("start");
      const end = URLSearchParams.get("end");
      const queryParams: ScoreboardSearchParams = {};
      if (condition === "all" || condition === "created" || condition === "participated")
        queryParams.condition = condition;
      if (status === "all" || status === "open" || status === "closed") queryParams.status = status;
      if (cityId) queryParams.cityId = cityId;
      if (start && isValidDateFormatByDash(start)) queryParams.start = start;
      if (end && isValidDateFormatByDash(end)) queryParams.end = end;
      if (pageParam) queryParams.key = pageParam;
      return getParticipationRecord(pageUserId, queryParams);
    },
    [pageUserId],
  );

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["record_list", searchParams.toString()],
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
    return () => observer.disconnect();
  }, [target, data, observer]);

  return (
    <div>
      <span>RecordCardList</span>
      {hasNextPage && <div className="observe-area" ref={target} />}
    </div>
  );
}

export default RecordCardList;

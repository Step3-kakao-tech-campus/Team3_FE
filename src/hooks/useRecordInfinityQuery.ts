import { getParticipationRecord } from "@/apis/record";
import { RecordData } from "@/types/recordData";
import { ScoreboardSearchParams } from "@/types/scoreboardSearchParams";
import isValidDateFormatByDash from "@/utils/validDateStringFormat";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Prop {
  pageUserId: number;
  searchParams: ReadonlyURLSearchParams;
}

function useRecordInfinityQuery({ pageUserId, searchParams }: Prop) {
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

  const hasPage = !!data?.pages[0]?.data?.response?.posts?.length;
  const pages = data?.pages?.map((page) => page?.data?.response?.posts as RecordData[]);

  return { fetchNextPage, hasNextPage, hasPage, pages };
}

export default useRecordInfinityQuery;

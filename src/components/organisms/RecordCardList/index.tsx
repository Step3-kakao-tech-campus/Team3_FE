"use client";

import RecordCard from "@/components/molecules/RecordCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useRecordInfinityQuery from "@/hooks/useRecordInfinityQuery";
import { RecordData } from "@/types/recordData";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function RecordCardList(): JSX.Element {
  const params = useParams();
  const searchParams = useSearchParams();
  const pageUserId = parseInt(params.scoreboard_user_id as string, 10) || 0;

  const { fetchNextPage, hasNextPage, hasPage, pages } = useRecordInfinityQuery({ pageUserId, searchParams });

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
    <div className="record-card-list flex flex-col gap-5 md:gap-3">
      {hasPage ? (
        pages?.map((page) => {
          return page?.map((post: RecordData) => {
            return <RecordCard data={post} key={post.id} />;
          });
        })
      ) : (
        <p className="no-post-search-result my-10 text-center center text-2xl text-neutral-500 md:text-xl">
          검색된 참여 기록이 없습니다. 더 넓은 범위로 검색해 보세요.
        </p>
      )}
      {hasNextPage && <div className="observe-area" ref={targetRef} />}
    </div>
  );
}

export default RecordCardList;

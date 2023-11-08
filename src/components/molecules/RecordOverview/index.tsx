"use client";

import { getRecord } from "@/apis/record";
import RecordSummary from "@/components/atoms/RecordSummary";
import { useQuery } from "@tanstack/react-query";

function RecordOverview({ userId }: { userId: number }) {
  const { data } = useQuery([`/api/users/${userId}/records`], () => getRecord(userId));
  const userName = data?.data?.response?.name;
  return (
    <>
      <h1 className="title text-2xl mt-2 md:text-xl">{userName}님의 기록</h1>
      <RecordSummary data={data?.data?.response} />
    </>
  );
}

export default RecordOverview;

"use client";

import Button from "@/components/atoms/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function RecordFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [condition, setCondition] = useState(searchParams.get("condition") || "all");
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  useEffect(() => {
    setCondition(searchParams.get("condition") || "all");
    setStatus(searchParams.get("status") || "all");
  }, [searchParams]);

  const handleCondition = useCallback(
    (newCondition: "all" | "created" | "participated") => {
      const searchParamObj = new URLSearchParams(searchParams);
      searchParamObj.set("condition", newCondition);
      const queryString = searchParamObj.toString();
      router.push(`?${queryString}`);
    },
    [router, searchParams],
  );
  const handleStatus = useCallback(
    (newStatus: "all" | "closed") => {
      const searchParamObj = new URLSearchParams(searchParams);
      searchParamObj.set("status", newStatus);
      const queryString = searchParamObj.toString();
      router.push(`?${queryString}`);
    },
    [router, searchParams],
  );

  return (
    <div className="post-filter flex flex-col gap-2">
      <div className="post-filter-condition flex w-fit gap-2">
        <Button
          onClick={() => {
            handleCondition("all");
          }}
          styleType={condition === "all" ? "thunder" : "outlined-gray"}
          size="sm"
          rounded="full"
        >
          전체 보기
        </Button>
        <Button
          onClick={() => {
            handleCondition("created");
          }}
          styleType={condition === "created" ? "thunder" : "outlined-gray"}
          size="sm"
          rounded="full"
        >
          작성한 글
        </Button>
        <Button
          onClick={() => {
            handleCondition("participated");
          }}
          styleType={condition === "participated" ? "thunder" : "outlined-gray"}
          size="sm"
          rounded="full"
        >
          참여한 글
        </Button>
      </div>
      <div className="post-filter-status flex w-fit gap-2">
        <Button
          onClick={() => {
            handleStatus("all");
          }}
          styleType={status === "all" ? "thunder" : "outlined-gray"}
          size="sm"
          rounded="full"
        >
          전체
        </Button>
        <Button
          onClick={() => {
            handleStatus("closed");
          }}
          styleType={status === "closed" ? "thunder" : "outlined-gray"}
          size="sm"
          rounded="full"
        >
          모집 완료
        </Button>
      </div>
    </div>
  );
}

export default RecordFilter;

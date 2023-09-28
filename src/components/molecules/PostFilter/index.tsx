"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function PostFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const router = useRouter();

  const searchParamAll = newSearchParams.get("all");
  const [isAll, setIsAll] = useState(searchParamAll !== "false");

  const handleOnClick = (newIsAll: boolean) => {
    setIsAll(newIsAll);
    newSearchParams.set("all", newIsAll.toString());
    const queryString = newSearchParams.toString();
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="post-filter flex w-fit">
      <button
        type="button"
        onClick={() => {
          handleOnClick(true);
        }}
      >
        전체 보기
      </button>
      <button
        type="button"
        onClick={() => {
          handleOnClick(false);
        }}
      >
        모집중
      </button>
    </div>
  );
}

export default PostFilter;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Prop {
  pageSearchParams:
    | {
        search?: string | undefined;
      }
    | undefined;
}

function PostFilter({ pageSearchParams }: Prop) {
  const pathname = usePathname();
  const [searchParams, setSearchParams] = useState(new URLSearchParams(pageSearchParams));
  const [isAll, setIsAll] = useState(searchParams.get("all") !== "false");
  const router = useRouter();

  useEffect(() => {
    setSearchParams(new URLSearchParams(pageSearchParams));
  }, [pageSearchParams]);
  useEffect(() => {
    setIsAll(searchParams.get("all") !== "false");
  }, [searchParams]);

  const handleOnClick = (newIsAll: boolean) => {
    setIsAll(newIsAll);
    searchParams.set("all", newIsAll.toString());
    const queryString = searchParams.toString();
    router.push(`${pathname}?${queryString}`);
  };

  const commonButtonStyle = "rounded-full border min-w-[80px]";
  const selectedButtonStyle = "border-thunderOrange text-thunderOrange";
  const nonSelectedButtonStyle = "border-neutral-400 text-neutral-400";

  return (
    <div className="post-filter flex w-fit">
      <button
        type="button"
        onClick={() => {
          handleOnClick(true);
        }}
        className={`${commonButtonStyle} ${isAll ? selectedButtonStyle : nonSelectedButtonStyle}`}
      >
        전체 보기
      </button>
      <button
        type="button"
        onClick={() => {
          handleOnClick(false);
        }}
        className={`${commonButtonStyle} border ${!isAll ? selectedButtonStyle : nonSelectedButtonStyle}`}
      >
        모집중
      </button>
    </div>
  );
}

export default PostFilter;

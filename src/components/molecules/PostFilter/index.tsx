"use client";

import { PageSearchParams } from "@/types/pageSearchParams";
import { usePathname, useRouter } from "next/navigation";

function PostFilter({ searchParams }: PageSearchParams) {
  const pathname = usePathname();
  const searchParamsState = new URLSearchParams(searchParams);
  const isAll = searchParamsState.get("all") !== "false";
  const router = useRouter();

  const handleOnClick = (newIsAll: boolean) => {
    searchParamsState.set("all", newIsAll.toString());
    const queryString = searchParamsState.toString();
    router.push(`${pathname}?${queryString}`);
  };

  const commonButtonStyle = "rounded-full border min-w-[80px]";
  const selectedButtonStyle = "border-thunderOrange text-thunderOrange";
  const nonSelectedButtonStyle = "border-neutral-400 text-neutral-400";

  return (
    <div className="post-filter flex w-fit gap-2">
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

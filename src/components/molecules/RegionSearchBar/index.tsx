"use client";

import { MdSearch } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import objectToQueryString from "@/utils/objectToQueryString";
import { PageSearchParams } from "@/types/pageSearchParams";
import DropdownBox from "../DropdownBox";

function RegionSearchBar({ searchParams }: PageSearchParams) {
  const searchParamsToState = useCallback((param: URLSearchParams) => {
    return {
      cityId: !Number.isNaN(parseInt(param.get("cityId")!, 10)) ? parseInt(param.get("cityId")!, 10) : -1,
      countryId: !Number.isNaN(parseInt(param.get("countryId")!, 10)) ? parseInt(param.get("countryId")!, 10) : -1,
      districtId: !Number.isNaN(parseInt(param.get("districtId")!, 10)) ? parseInt(param.get("districtId")!, 10) : -1,
    };
  }, []);

  const [searchParamsState, setSearchParamsState] = useState(new URLSearchParams(searchParams));
  const [regionIds, setRegionIds] = useState(searchParamsToState(searchParamsState));

  useEffect(() => {
    setSearchParamsState(new URLSearchParams(searchParams));
  }, [searchParams]);
  useEffect(() => {
    setRegionIds(searchParamsToState(searchParamsState));
  }, [searchParamsState, searchParamsToState]);

  const router = useRouter();
  const queryString = objectToQueryString(regionIds);
  return (
    <div className="region-search-bar flex items-center gap-5">
      <div className="drop-box-wrapper grow">
        <DropdownBox styleType="big" selectedOptionIds={regionIds} setSelectedOptionIds={setRegionIds} />
      </div>
      <button
        type="button"
        className="min-w-[40px] h-10 rounded-full bg-thunder outline outline-1 outline-white shadow-xl"
        onClick={() => {
          if (regionIds.cityId >= 0 && regionIds.countryId >= 0 && regionIds.districtId >= 0)
            router.push(`/${queryString}`);
        }}
      >
        <MdSearch size={28} color="white" className="m-auto" />
      </button>
    </div>
  );
}

export default RegionSearchBar;

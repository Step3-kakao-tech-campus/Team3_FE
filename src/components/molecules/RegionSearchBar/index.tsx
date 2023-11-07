"use client";

import { MdSearch } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import objectToQueryString from "@/utils/objectToQueryString";
import { PageSearchParams } from "@/types/pageSearchParams";
import DropdownBox from "../DropdownBox";

function RegionSearchBar({ searchParams }: PageSearchParams): JSX.Element {
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
    <div className="region-search-bar flex justify-evenly items-center gap-5">
      <div className="drop-box-wrapper max-w-3xl grow">
        <DropdownBox styleType="big" selectedOptionIds={regionIds} setSelectedOptionIds={setRegionIds} />
      </div>
      <button
        type="button"
        className="min-w-[40px] h-10 rounded-full bg-thunder outline outline-1 outline-white shadow-xl md:min-w-[30px] md:h-[30px]"
        onClick={() => {
          if (regionIds.cityId >= 0 && regionIds.countryId >= 0 && regionIds.districtId >= 0)
            router.push(`/${queryString}`);
        }}
      >
        <MdSearch className="w-7 h-7 text-white m-auto md:w-5 md:h-5" />
      </button>
    </div>
  );
}

export default RegionSearchBar;

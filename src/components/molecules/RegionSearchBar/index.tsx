"use client";

import { MdSearch } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import objectToQueryString from "@/utils/objectToQueryString";
import DropdownBox from "../DropdownBox";

interface Prop {
  pageSearchParams:
    | {
        search?: string | undefined;
      }
    | undefined;
}

function RegionSearchBar({ pageSearchParams }: Prop) {
  const searchParamsToState = useCallback((param: URLSearchParams) => {
    return {
      cityId: param.get("cityId") ? parseInt(param.get("cityId")!, 10) : -1,
      countryId: param.get("countryId") ? parseInt(param.get("countryId")!, 10) : -1,
      districtId: param.get("districtId") ? parseInt(param.get("districtId")!, 10) : -1,
    };
  }, []);

  const [searchParams, setSearchParams] = useState(new URLSearchParams(pageSearchParams));
  const [regionIds, setRegionIds] = useState(searchParamsToState(searchParams));

  useEffect(() => {
    setSearchParams(new URLSearchParams(pageSearchParams));
  }, [pageSearchParams]);
  useEffect(() => {
    setRegionIds(searchParamsToState(searchParams));
  }, [searchParams, searchParamsToState]);

  const router = useRouter();
  const queryString = objectToQueryString(regionIds);
  return (
    <div className="region-search-bar flex items-center">
      <div className="drop-box-wrapper grow">
        <DropdownBox styleType="big" selectedOptionIds={regionIds} setSelectedOptionIds={setRegionIds} />
      </div>
      <button
        type="button"
        className="w-10 h-10 ml-10 rounded-full bg-thunder outline outline-1 outline-white shadow-xl"
        onClick={() => {
          router.push(`/${queryString}`);
        }}
      >
        <MdSearch size={28} color="white" className="m-auto" />
      </button>
    </div>
  );
}

export default RegionSearchBar;

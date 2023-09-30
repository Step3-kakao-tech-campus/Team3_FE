"use client";

import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import objectToQueryString from "@/utils/objectToQueryString";
import DropdownBox from "../DropdownBox";

function RegionSearchBar() {
  const searchParams = useSearchParams();
  const initialValue = {
    cityId: searchParams.get("cityId") ? parseInt(searchParams.get("cityId")!, 10) : -1,
    countryId: searchParams.get("countryId") ? parseInt(searchParams.get("countryId")!, 10) : -1,
    districtId: searchParams.get("districtId") ? parseInt(searchParams.get("districtId")!, 10) : -1,
  };
  const [regionIds, setRegionIds] = useState(initialValue);
  const router = useRouter();
  const queryString = objectToQueryString(regionIds);
  return (
    <div className="region-search-bar flex items-center">
      <div className="drop-box-wrapper grow">
        <DropdownBox
          styleType="big"
          onChange={(newIds) => {
            setRegionIds(newIds);
          }}
          initialValue={initialValue}
        />
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

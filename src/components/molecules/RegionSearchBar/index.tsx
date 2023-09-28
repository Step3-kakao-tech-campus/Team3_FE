"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import objectToQueryString from "@/utils/objectToQueryString";
import DropdownBox from "../DropdownBox";

function RegionSearchBar() {
  const [regionIds, setRegionIds] = useState({
    cityId: "-1",
    countryId: "-1",
    districtId: "-1",
  });
  const router = useRouter();
  const queryString = objectToQueryString(regionIds);
  return (
    <div className="region-search-bar flex items-center">
      <DropdownBox
        styleType="big"
        onChange={(newIds) => {
          setRegionIds(newIds);
        }}
      />
      <button
        type="button"
        onClick={() => {
          router.push(`/${queryString}`);
        }}
      >
        검색
      </button>
    </div>
  );
}

export default RegionSearchBar;

"use client";

import { MdSearch } from "react-icons/md";
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
        className="w-10 h-10 rounded-full bg-thunder outline outline-1 outline-white shadow-xl"
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

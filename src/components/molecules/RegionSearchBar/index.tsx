"use client";

import { useState } from "react";
import DropdownBox from "../DropdownBox";

function RegionSearchBar() {
  const [regionIds, setRegionIds] = useState({
    cityId: "-1",
    countryId: "-1",
    districtId: "-1",
  });
  return (
    <div className="region-search-bar flex">
      <DropdownBox
        styleType="big"
        onChange={(newIds) => {
          setRegionIds(newIds);
        }}
      />
      <button type="button" onClick={() => {}}>
        검색
      </button>
    </div>
  );
}

export default RegionSearchBar;

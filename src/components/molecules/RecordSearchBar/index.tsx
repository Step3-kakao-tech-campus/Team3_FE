"use client";

import { getCities } from "@/apis/district";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

function RecordSearchBar(): JSX.Element {
  const [searchBarState, setSearchBarState] = useState({ cityId: 0, start: "2022-02", end: "2022-02" });
  const { data } = useQuery({
    queryKey: ["cityId"],
    queryFn: getCities,
  });

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, dropdownType: "cityId" | "start" | "end") => {
      const newState = dropdownType === "cityId" ? parseInt(event.target.value, 10) : event.target.value;
      setSearchBarState((prev) => ({
        ...prev,
        [dropdownType]: newState,
      }));
    },
    [],
  );

  const cities = data?.data?.response?.cities ?? [];
  return (
    <div className="record-search-bar flex gap-4">
      <Dropdown
        placeholder=""
        onChange={(e) => handleOnChange(e, "cityId")}
        styleType="small"
        options={[{ id: 0, name: "전체 지역" }, ...cities]}
      />
      <div className="period-dropdown flex gap-2 items-center">
        <Dropdown
          placeholder=""
          onChange={(e) => handleOnChange(e, "start")}
          styleType="small"
          options={[{ id: 0, name: "1111년 11월" }]}
        />
        <span className="leading-none">~</span>
        <Dropdown
          placeholder=""
          onChange={(e) => handleOnChange(e, "end")}
          styleType="small"
          options={[{ id: 0, name: "9999년 9월" }]}
        />
      </div>
      <Button styleType="thunder" fontWeight="normal" size="sm" rounded="full">
        조회
      </Button>
    </div>
  );
}

export default RecordSearchBar;

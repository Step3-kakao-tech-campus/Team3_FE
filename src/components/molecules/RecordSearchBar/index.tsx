"use client";

import { getCities } from "@/apis/district";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SimpleDatePicker from "../SimpleDatePicker";

function RecordSearchBar(): JSX.Element {
  const [cityId, setCityId] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { data } = useQuery({
    queryKey: ["cityId"],
    queryFn: getCities,
  });

  const cities = data?.data?.response?.cities ?? [];
  return (
    <div className="record-search-bar flex gap-4 items-center">
      <div>
        <Dropdown
          placeholder=""
          onChange={(e) => {
            setCityId(parseInt(e.target.value, 10));
          }}
          styleType="small"
          options={[{ id: 0, name: "전체 지역" }, ...cities]}
        />
      </div>
      <div className="period-dropdown flex gap-2 items-center">
        <SimpleDatePicker value={startDate} setValue={setStartDate} />
        <SimpleDatePicker minDate={startDate} value={endDate} setValue={setEndDate} />
      </div>
      <div>
        <Button styleType="thunder" fontWeight="normal" size="sm" rounded="full">
          조회
        </Button>
      </div>
    </div>
  );
}

export default RecordSearchBar;

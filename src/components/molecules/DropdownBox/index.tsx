"use client";

import React, { useCallback, useEffect, useState } from "react";
import Dropdown from "@/components/atoms/Dropdown";
import { useQueries } from "@tanstack/react-query";
import getCities from "@/app/apis/getCities";
import getCountries from "@/app/apis/getCountries";
import getDistricts from "@/app/apis/getDistricts";

interface Props {
  onChange?: (e: { cityId: string; countryId: string; districtId: string }) => void;
  styleType: "big" | "small";
}

function DropdownBox({ onChange, styleType }: Props) {
  const [selectedOptionIds, setSelectedOptionIds] = useState({ cityId: "-1", countryId: "-1", districtId: "-1" });

  const queries = useQueries({
    queries: [
      {
        queryKey: ["cityId"],
        queryFn: async () => {
          const response = await getCities();
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
      {
        queryKey: ["countryId", selectedOptionIds.cityId],
        queryFn: async () => {
          const response = await getCountries(selectedOptionIds.cityId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
      {
        queryKey: ["districtId", selectedOptionIds.countryId],
        queryFn: async () => {
          const response = await getDistricts(selectedOptionIds.countryId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
    ],
  });

  const options1 = queries[0]?.data?.response?.cities || [];
  const options2 = queries[1]?.data?.response?.countries || [];
  const options3 = queries[2]?.data?.response?.districts || [];

  const handleDropdownChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>, dropdownType: string) => {
    const newValue = e.target.value;
    // city가 바뀌면 country와 district는 -1로 초기화, country가 바뀌면 district는 -1로 초기화
    if (dropdownType === "cityId") {
      setSelectedOptionIds({ cityId: newValue, countryId: "-1", districtId: "-1" });
    } else if (dropdownType === "countryId") {
      setSelectedOptionIds((prevIds) => ({
        ...prevIds,
        countryId: newValue,
        districtId: "-1",
      }));
    } else {
      setSelectedOptionIds((prevIds) => ({
        ...prevIds,
        [dropdownType]: newValue,
      }));
    }
  }, []);

  // 선택된 지역들의 상태 변경 시 상위 컴포넌트로 상태 끌어올리기
  useEffect(() => {
    if (onChange) onChange(selectedOptionIds);
  }, [onChange, selectedOptionIds]);

  return (
    <div className="flex justify-between">
      <Dropdown
        placeholder="광역시 / 도"
        options={options1}
        onChange={(e) => handleDropdownChange(e, "cityId")}
        styleType={styleType}
      />

      <Dropdown
        placeholder="시 / 군 / 구"
        options={options2}
        onChange={(e) => handleDropdownChange(e, "countryId")}
        styleType={styleType}
      />

      <Dropdown
        placeholder="읍 / 면 / 동"
        options={options3}
        onChange={(e) => handleDropdownChange(e, "districtId")}
        styleType={styleType}
      />
    </div>
  );
}

export default DropdownBox;

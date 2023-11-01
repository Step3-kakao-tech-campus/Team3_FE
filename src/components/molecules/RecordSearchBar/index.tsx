"use client";

import { getCities } from "@/apis/district";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateToStringByDash } from "@/utils/formatDateToString";
import formatStringToDateByDash from "@/utils/formatStringToDate";
import SimpleDatePicker from "../SimpleDatePicker";

function RecordSearchBar(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentDate = useMemo(() => new Date(), []);
  const [cityId, setCityId] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const threeMonthsAgoDate = new Date();
    threeMonthsAgoDate.setMonth(currentDate.getMonth() - 3);
    const searchParamStartDate = formatStringToDateByDash(searchParams.get("start") as string);
    const searchParamEndDate = formatStringToDateByDash(searchParams.get("end") as string);
    setStartDate(searchParamStartDate || threeMonthsAgoDate);
    setEndDate(searchParamEndDate || undefined);
  }, [currentDate, searchParams]);

  const { data } = useQuery({
    queryKey: ["cityId"],
    queryFn: getCities,
  });
  const cities = data?.data?.response?.cities ?? [];

  const handleOnClick = useCallback(() => {
    const searchParamObj = new URLSearchParams(searchParams);
    if (cityId) searchParamObj.set("cityId", cityId.toString());
    else searchParamObj.delete("cityId");
    if (startDate) searchParamObj.set("start", formatDateToStringByDash(startDate));
    if (endDate) searchParamObj.set("end", formatDateToStringByDash(endDate));
    const queryString = searchParamObj.toString();
    router.push(`?${queryString}`);
  }, [cityId, endDate, router, searchParams, startDate]);

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
          selectedOptionId={cityId}
        />
      </div>
      <div className="period-dropdown flex gap-2 items-center">
        <SimpleDatePicker value={startDate} setValue={setStartDate} maxDate={currentDate} />
        <span className="text-neutral-500">~</span>
        <SimpleDatePicker value={endDate} setValue={setEndDate} minDate={startDate} />
      </div>
      <div>
        <Button styleType="thunder" fontWeight="normal" size="sm" rounded="full" onClick={handleOnClick}>
          조회
        </Button>
      </div>
    </div>
  );
}

export default RecordSearchBar;

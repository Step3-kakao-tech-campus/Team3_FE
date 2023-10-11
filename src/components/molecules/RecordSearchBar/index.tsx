"use client";

import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";

function RecordSearchBar() {
  return (
    <div className="record-search-bar flex gap-4">
      <Dropdown placeholder="" onChange={() => {}} styleType="small" options={[{ id: 0, name: "전체 지역" }]} />
      <div className="period-dropdown flex gap-2 items-center">
        <Dropdown placeholder="" onChange={() => {}} styleType="small" options={[{ id: 0, name: "1111년 11월" }]} />
        <span className="leading-none">~</span>
        <Dropdown placeholder="" onChange={() => {}} styleType="small" options={[{ id: 0, name: "9999년 9월" }]} />
      </div>
      <Button styleType="thunder-w-20" fontWeight="normal" size="sm" rounded="full">
        조회
      </Button>
    </div>
  );
}

export default RecordSearchBar;

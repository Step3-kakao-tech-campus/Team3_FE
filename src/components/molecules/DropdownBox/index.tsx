"use client";
import React, { useState } from "react";
import Dropdown from "@/components/atoms/Dropdown";

function DropdownBox() {
  const createOption = (value: string) => ({ value, label: value });

  const options1 = [createOption("광역시 / 도"), createOption("서울특별시"), createOption("부산광역시")];

  const options2 = [createOption("시 / 군 / 구"), createOption("남구"), createOption("북구")];

  const options3 = [createOption("동 / 면 / 읍"), createOption("장전동"), createOption("부저동")];

  const [selectedOption1, setSelectedOption1] = useState(options1[0].value);
  const [selectedOption2, setSelectedOption2] = useState(options2[0].value);
  const [selectedOption3, setSelectedOption3] = useState(options3[0].value);

  const handleDropdownChange1 = (selectedValue: any) => {
    setSelectedOption1(selectedValue);
  };

  const handleDropdownChange2 = (selectedValue: any) => {
    setSelectedOption2(selectedValue);
  };

  const handleDropdownChange3 = (selectedValue: any) => {
    setSelectedOption3(selectedValue);
  };

  return (
    <div className="flex justify-between">
      <Dropdown
        options={options1}
        selectedValue={selectedOption1}
        onChange={handleDropdownChange1}
        className="w-[180px]" // Adjust the width as needed
      />

      <Dropdown
        options={options2}
        selectedValue={selectedOption2}
        onChange={handleDropdownChange2}
        className="w-[180px]" // Adjust the width as needed
      />

      <Dropdown
        options={options3}
        selectedValue={selectedOption3}
        onChange={handleDropdownChange3}
        className="w-[180px]" // Adjust the width as needed
      />
    </div>
  );
}

export default DropdownBox;

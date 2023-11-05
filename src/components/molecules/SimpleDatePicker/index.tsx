"use client";

import Button from "@/components/atoms/Button";
import { formatDateToStringByDash } from "@/utils/formatDateToString";
import { SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  value: Date | undefined;
  setValue: React.Dispatch<SetStateAction<Date | undefined>>;
  minDate?: Date;
  maxDate?: Date;
}

function SimpleDatePicker({ value, setValue, minDate, maxDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (minDate && value && value < minDate) {
      setValue(minDate);
    }
  }, [minDate, setValue, value]);

  return (
    <div className="relative flex items-center gap-6">
      <Button
        styleType="outlined-gray"
        rounded="full"
        size="sm"
        fontWeight="normal"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {value ? formatDateToStringByDash(value) : "전체 기간"}
      </Button>
      {isOpen && (
        <div className="absolute top-full">
          <Calendar
            locale="ko"
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(selectedData) => {
              setValue(selectedData as Date);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SimpleDatePicker;

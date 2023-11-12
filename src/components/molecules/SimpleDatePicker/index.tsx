"use client";

import Button from "@/components/atoms/Button";
import { formatDateToStringByDash } from "@/utils/formatDateToString";
import { SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  value: Date | undefined;
  isRight?: boolean;
  setValue: React.Dispatch<SetStateAction<Date | undefined>>;
  minDate?: Date;
  maxDate?: Date;
}

function SimpleDatePicker({ value, isRight, setValue, minDate, maxDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (minDate && value && value < minDate) {
      setValue(minDate);
    }
  }, [minDate, setValue, value]);

  return (
    <div className="relative flex items-center gap-6 md:gap-2">
      <Button
        styleType="outlined-gray"
        rounded="full"
        size="sm"
        fontWeight="normal"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="md:text-xs">{value ? formatDateToStringByDash(value) : "전체 기간"}</span>
      </Button>
      {isOpen && (
        <div className={`absolute top-full ${isRight ? "md:right-[-80px]" : "md:right-[-160px]"}`}>
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

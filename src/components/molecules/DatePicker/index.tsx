"use client";

import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import OptionTitle from "@/components/atoms/OptionTitle";
import { formatDateToString } from "@/utils/formatDateToString";
import { SetStateAction, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GiAlarmClock } from "react-icons/gi";

interface Props {
  title: string;
  value: Date | null;
  setValue: React.Dispatch<SetStateAction<Date | null>>;
}

function DatePicker({ title, value, setValue }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const minDate = new Date();

  const [selectedHours, setSelectedHours] = useState(-1);
  const [selectedMinutes, setSelectedMinutes] = useState(-1);

  const hoursOptions = [
    { name: "0시", id: 0 },
    { name: "1시", id: 1 },
    { name: "2시", id: 2 },
    { name: "3시", id: 3 },
    { name: "4시", id: 4 },
    { name: "5시", id: 5 },
    { name: "6시", id: 6 },
    { name: "7시", id: 7 },
    { name: "8시", id: 8 },
    { name: "9시", id: 9 },
    { name: "10시", id: 10 },
    { name: "11시", id: 11 },
    { name: "12시", id: 12 },
    { name: "13시", id: 13 },
    { name: "14시", id: 14 },
    { name: "15시", id: 15 },
    { name: "16시", id: 16 },
    { name: "17시", id: 17 },
    { name: "18시", id: 18 },
    { name: "19시", id: 19 },
    { name: "20시", id: 20 },
    { name: "21시", id: 21 },
    { name: "22시", id: 22 },
    { name: "23시", id: 23 },
  ];
  const minutesOptions = [
    { name: "0분", id: 0 },
    { name: "10분", id: 10 },
    { name: "20분", id: 20 },
    { name: "30분", id: 30 },
    { name: "40분", id: 40 },
    { name: "50분", id: 50 },
  ];

  return (
    <div className="flex-1">
      <div className="relative flex items-center gap-6">
        <OptionTitle>{title} 일시</OptionTitle>
        <Button
          styleType="thunder_full_sm"
          onClick={() => {
            if (!isTimeOpen) {
              setIsOpen((prev) => !prev);
              setSelectedHours(-1);
              setSelectedMinutes(-1);
            }
          }}
        >
          날짜 설정
        </Button>
        {isOpen && (
          <div className="absolute top-full">
            <Calendar
              locale="ko"
              value={value}
              minDate={minDate}
              onChange={(selectedData) => {
                setValue(selectedData as Date);
                setIsOpen(false);
                setIsTimeOpen(true);
              }}
            />
          </div>
        )}
        {isTimeOpen && (
          <div className="absolute top-full bg-white">
            <Dropdown
              placeholder="시간"
              options={hoursOptions}
              styleType="small"
              onChange={(e) => {
                setSelectedHours(parseInt(e.target.value, 10));
                setValue((prev) => {
                  if (prev) {
                    const newDate = new Date(prev);
                    newDate.setHours(parseInt(e.target.value, 10));
                    return newDate;
                  }
                  return null;
                });
                if (selectedMinutes !== -1) setIsTimeOpen(false);
              }}
              selectedOptionId={selectedHours}
            />
            <Dropdown
              placeholder="분"
              options={minutesOptions}
              styleType="small"
              onChange={(e) => {
                setSelectedMinutes(parseInt(e.target.value, 10));
                setValue((prev) => {
                  if (prev) {
                    const newDate = new Date(prev);
                    newDate.setMinutes(parseInt(e.target.value, 10));
                    return newDate;
                  }
                  return null;
                });
                if (selectedHours !== -1) setIsTimeOpen(false);
              }}
              selectedOptionId={selectedMinutes}
            />
          </div>
        )}
      </div>
      <div className="text-xs lg:text-base">
        {value ? (
          <div>{formatDateToString(value)}</div>
        ) : (
          <p className="text-gray-400">
            <GiAlarmClock className="inline mr-1 mb-1" />
            날짜 설정 버튼을 눌러 {title} 일시를 설정해 주세요.
          </p>
        )}
      </div>
    </div>
  );
}

export default DatePicker;

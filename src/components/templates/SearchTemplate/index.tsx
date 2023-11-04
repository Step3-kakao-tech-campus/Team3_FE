"use client";

import KaKaoMap from "@/components/molecules/KaKaoMap";
import { MdSearch } from "react-icons/md";
import React, { useRef, useState } from "react";
import useToast from "@/hooks/useToast";

function SearchTemplate() {
  const ref = useRef<HTMLInputElement>(null);
  const [place, setPlace] = useState("");
  const [update, setUpdate] = useState(false);
  const { addWarningToast } = useToast();

  const handleOnClick = () => {
    const inputValue = ref.current!.value;
    if (inputValue === "") {
      addWarningToast("검색어를 입력해 주세요.");
      return;
    }

    if (inputValue.includes("볼링")) {
      setPlace(inputValue);
    } else {
      setPlace(`${inputValue} 볼링장`);
    }

    setUpdate((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="my-4 font-bold text-2xl">볼링장 찾기</h1>
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="text"
            placeholder="검색어를 입력하세요."
            className="w-[300px] h-8 py-2 px-3 rounded-lg border border-gray-400 shadow-md"
          />
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-thunder outline outline-1 outline-white shadow-xl"
            onClick={handleOnClick}
          >
            <MdSearch className="w-6 h-6 text-white m-auto" />
          </button>
        </div>
      </div>
      <p className="mb-6">볼링장 이름 혹은 지역을 검색해 주세요.</p>
      <KaKaoMap place={place} update={update} />
    </div>
  );
}

export default SearchTemplate;

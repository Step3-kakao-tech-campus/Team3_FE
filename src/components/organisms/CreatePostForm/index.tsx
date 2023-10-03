"use client";

import { useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import OptionTitle from "@/components/atoms/OptionTitle";
import Button from "@/components/atoms/Button";
import DatePicker from "@/components/molecules/DatePicker";
import { useRouter } from "next/navigation";
import DropdownBox from "@/components/molecules/DropdownBox";
import { postRegisterPosts } from "@/apis/posts";
import { useMutation } from "@tanstack/react-query";

function CreatePostForm() {
  const [regionIds, setRegionIds] = useState({ cityId: -1, countryId: -1, districtId: -1 });
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const errRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();

  const { mutate } = useMutation({ mutationFn: postRegisterPosts });

  const handleBack = () => {
    router.refresh();
    router.push("/");
  };

  const handleSubmit = () => {
    const currentTime = new Date();

    if (titleRef.current!.value === "") {
      errRef.current!.innerHTML = "제목을 입력해 주세요.";
    } else if (titleRef.current!.value.length < 5) {
      errRef.current!.innerHTML = "제목은 5글자 이상이어야 합니다.";
    } else if (regionIds.districtId === -1 || regionIds.districtId === 0) {
      errRef.current!.innerHTML = "모집 지역을 선택해 주세요.";
    } else if (startTime === null) {
      errRef.current!.innerHTML = "모임 일시를 선택해 주세요.";
    } else if (startTime < currentTime) {
      errRef.current!.innerHTML = "모임 일시는 과거가 될 수 없습니다.";
    } else if (dueTime === null) {
      errRef.current!.innerHTML = "마감 일시를 선택해 주세요.";
    } else if (dueTime < currentTime) {
      errRef.current!.innerHTML = "마감 일시는 과거가 될 수 없습니다.";
    } else if (contentRef.current!.value === "") {
      errRef.current!.innerHTML = "내용을 입력해 주세요.";
    } else {
      const payload = {
        title: titleRef.current!.value,
        districtId: regionIds.districtId,
        startTime,
        dueTime,
        content: contentRef.current!.value,
      };
      mutate(payload, {
        onSuccess: (res) => {
          console.log(res);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  return (
    <div>
      <MdArrowBack onClick={handleBack} size="30" className="cursor-pointer" />
      <h2 className="my-4 font-bold text-2xl">모집글 작성</h2>
      <OptionTitle>제목</OptionTitle>
      <input
        type="text"
        placeholder="제목을 입력해 주세요."
        className="w-full py-2 px-3 rounded-lg border border-gray-400"
        ref={titleRef}
      />
      <OptionTitle>모집 지역</OptionTitle>
      <DropdownBox selectedOptionIds={regionIds} setSelectedOptionIds={setRegionIds} styleType="small" />
      <div className="flex">
        <DatePicker title="모임" value={startTime} setValue={setStartTime} />
        <DatePicker title="마감" value={dueTime} setValue={setDueTime} />
      </div>
      <OptionTitle>내용</OptionTitle>
      <textarea
        className="resize-none py-2 px-3 w-full h-96 rounded-lg border border-gray-400"
        placeholder="내용을 입력해 주세요."
        ref={contentRef}
      />
      <p className="mt-2 text-[#ff003e]" ref={errRef} />
      <div className="flex justify-center mt-6">
        <Button styleType="thunder_full" onClick={handleSubmit}>
          업로드
        </Button>
      </div>
    </div>
  );
}

export default CreatePostForm;

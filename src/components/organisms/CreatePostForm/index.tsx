"use client";

import { useRef, useState } from "react";
import OptionTitle from "@/components/atoms/OptionTitle";
import Button from "@/components/atoms/Button";
import DatePicker from "@/components/molecules/DatePicker";
import DropdownBox from "@/components/molecules/DropdownBox";
import { postRegisterPosts } from "@/apis/posts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatDateToKoreanTime } from "@/utils/formatDateToString";
import { useRouter } from "next/navigation";
import useApiErrorToast from "@/hooks/useApiErrorToast";
import { getMyProfile } from "@/apis/profile";
import { getAllRegions } from "@/apis/district";

function CreatePostForm(): JSX.Element {
  const { data } = useQuery(["/api/users/mine"], getMyProfile, {
    suspense: true,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const districtId = data?.data?.response?.districtId;

  const { data: regionData } = useQuery([`/api/cities/districts/${districtId}`], () => getAllRegions(districtId), {
    suspense: true,
    staleTime: Infinity,
  });

  const cityId = regionData?.data?.response?.cityId;
  const countryId = regionData?.data?.response?.countryId;

  const [regionIds, setRegionIds] = useState({ cityId, countryId, districtId });
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [errMsg, setErrMsg] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const { addApiErrorToast } = useApiErrorToast();

  const { mutate } = useMutation({ mutationFn: postRegisterPosts });

  const handleSubmit = () => {
    const currentTime = new Date();

    if (titleRef.current!.value === "") {
      setErrMsg("제목을 입력해 주세요.");
    } else if (titleRef.current!.value.length < 5) {
      setErrMsg("제목은 5글자 이상이어야 합니다.");
    } else if (regionIds.districtId === -1 || regionIds.districtId === 0) {
      setErrMsg("모집 지역을 선택해 주세요.");
    } else if (startTime === null) {
      setErrMsg("모임 일시를 선택해 주세요.");
    } else if (startTime < currentTime) {
      setErrMsg("모임 일시는 과거가 될 수 없습니다.");
    } else if (dueTime === null) {
      setErrMsg("마감 일시를 선택해 주세요.");
    } else if (dueTime < currentTime) {
      setErrMsg("마감 일시는 과거가 될 수 없습니다.");
    } else if (contentRef.current!.value === "") {
      setErrMsg("내용을 입력해 주세요.");
    } else {
      const payload = {
        title: titleRef.current!.value,
        districtId: regionIds.districtId,
        startTime: formatDateToKoreanTime(startTime),
        dueTime: formatDateToKoreanTime(dueTime),
        content: contentRef.current!.value,
      };
      mutate(payload, {
        onSuccess: (res) => {
          router.replace(`/post/${res.data.response.id}`);
        },
        onError: (err) => {
          addApiErrorToast({ err, alt: "글 작성에 실패했습니다." });
        },
      });
    }
  };

  return (
    <div>
      <h2 className="my-4 font-bold text-2xl">모집글 작성</h2>
      <OptionTitle>제목</OptionTitle>
      <input
        type="text"
        placeholder="제목을 입력해 주세요."
        className="w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm"
        ref={titleRef}
      />
      <OptionTitle>모집 지역</OptionTitle>
      <DropdownBox selectedOptionIds={regionIds} setSelectedOptionIds={setRegionIds} styleType="small" />
      <div className="flex md:gap-2">
        <DatePicker title="모임" value={startTime} setValue={setStartTime} />
        <DatePicker title="마감" value={dueTime} isRight setValue={setDueTime} />
      </div>
      <OptionTitle>내용</OptionTitle>
      <textarea
        className="resize-none py-2 px-3 w-full h-96 rounded-lg border border-gray-400 md:h-60"
        placeholder="내용을 입력해 주세요."
        ref={contentRef}
      />
      <p className="mt-2 text-[#ff003e]">{errMsg}</p>
      <div className="flex justify-center mt-6">
        <Button styleType="thunder" rounded="full" size="lg" onClick={handleSubmit}>
          업로드
        </Button>
      </div>
    </div>
  );
}

export default CreatePostForm;

"use client";

import { getPostById, putPost } from "@/apis/posts";
import Button from "@/components/atoms/Button";
import OptionTitle from "@/components/atoms/OptionTitle";
import DatePicker from "@/components/molecules/DatePicker";
import useApiErrorToast from "@/hooks/useApiErrorToast";
import { formatDateToKoreanTime } from "@/utils/formatDateToString";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
}

function PostEditForm({ id }: Props) {
  const router = useRouter();

  const postId = parseInt(id, 10);

  const { addApiErrorToast } = useApiErrorToast();

  const { data } = useQuery([`/api/posts${id}`, id], () => getPostById(postId), {
    suspense: true,
  });

  const post = data?.data?.response.post || {};

  const { mutate } = useMutation(putPost);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [startTime, setStartTime] = useState<Date>(post.startTime);
  const [dueTime, setDueTime] = useState<Date>(post.dueTime);
  const [errMsg, setErrMsg] = useState("");

  const handleEdit = () => {
    const currentTime = new Date();

    if (titleRef.current!.value === "") {
      setErrMsg("제목을 입력해 주세요.");
    } else if (titleRef.current!.value.length < 5) {
      setErrMsg("제목은 5글자 이상이어야 합니다.");
    } else if (startTime < currentTime) {
      setErrMsg("모임 일시는 과거가 될 수 없습니다.");
    } else if (dueTime < currentTime) {
      setErrMsg("마감 일시는 과거가 될 수 없습니다.");
    } else if (contentRef.current!.value === "") {
      setErrMsg("내용을 입력해 주세요.");
    } else {
      const payload = {
        id: postId,
        title: titleRef.current!.value,
        startTime:
          post.startTime === startTime
            ? formatDateToKoreanTime(new Date(startTime))
            : formatDateToKoreanTime(startTime),
        dueTime: post.dueTime === dueTime ? formatDateToKoreanTime(new Date(dueTime)) : formatDateToKoreanTime(dueTime),
        content: contentRef.current!.value,
      };
      mutate(payload, {
        onSuccess: () => {
          router.back();
        },
        onError: (err) => {
          addApiErrorToast({ err, alt: "글 수정에 실패했습니다." });
        },
      });
    }
  };

  useEffect(() => {
    setStartTime(post.startTime);
    setDueTime(post.dueTime);
  });

  return (
    <div>
      <OptionTitle>제목</OptionTitle>
      <input
        type="text"
        placeholder="제목을 입력해 주세요."
        className="w-full py-2 px-3 rounded-lg border border-gray-400 md:text-sm"
        defaultValue={post.title}
        ref={titleRef}
      />
      <div className="flex">
        <DatePicker
          title="모임"
          value={startTime}
          setValue={setStartTime as React.Dispatch<React.SetStateAction<Date | null>>}
        />
        <DatePicker
          title="마감"
          value={dueTime}
          isRight
          setValue={setDueTime as React.Dispatch<React.SetStateAction<Date | null>>}
        />
      </div>
      <OptionTitle>내용</OptionTitle>
      <textarea
        className="resize-none py-2 px-3 w-full h-96 rounded-lg border border-gray-400 md:h-[300px]"
        placeholder="내용을 입력해 주세요."
        defaultValue={post.content}
        ref={contentRef}
      />
      <p className="mt-2 text-[#ff003e]">{errMsg}</p>
      <div className="flex justify-center mt-6">
        <Button styleType="thunder" rounded="full" size="lg" onClick={handleEdit}>
          수정하기
        </Button>
      </div>
    </div>
  );
}

export default PostEditForm;

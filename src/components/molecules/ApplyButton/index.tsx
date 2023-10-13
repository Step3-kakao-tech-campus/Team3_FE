"use client";

import { deleteRejectApplicant, getCheckStatus, postApply } from "@/apis/applicant";
import Button from "@/components/atoms/Button";
import { getCookie } from "@/utils/Cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  postId: number;
  authorId: number;
}

function ApplyButton({ postId, authorId }: Props): JSX.Element {
  const userId = parseInt(getCookie("userId"), 10);

  const router = useRouter();

  const { data } = useQuery([`/api/posts${postId}/applicants/check-status`, postId], () => getCheckStatus(postId));

  const { mutate: applyMutate } = useMutation({ mutationFn: postApply });
  const { mutate: deleteMutate } = useMutation({ mutationFn: deleteRejectApplicant });

  const [isApplied, setIsApplied] = useState<boolean | null>(null);

  useEffect(() => {
    setIsApplied(data?.data?.response.isApplied);
  }, [data]);

  const handleApply = () => {
    applyMutate(postId, {
      onSuccess: () => {
        setIsApplied(true);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleDeleteApply = () => {
    deleteMutate(
      { postId, applicantId: userId },
      {
        onSuccess: () => {
          setIsApplied(false);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  if (authorId === userId) {
    return (
      <Button
        styleType="thunder"
        rounded="md"
        size="sm"
        onClick={() => {
          router.push(`/applicant_confirm/${postId}`, { scroll: false });
        }}
      >
        신청자 확인
      </Button>
    );
  }
  if (isApplied) {
    return (
      <Button styleType="filled-red" rounded="md" size="sm" onClick={handleDeleteApply}>
        신청취소
      </Button>
    );
  }
  return (
    <Button styleType="thunder" rounded="md" size="sm" onClick={handleApply}>
      신청하기
    </Button>
  );
}

export default ApplyButton;

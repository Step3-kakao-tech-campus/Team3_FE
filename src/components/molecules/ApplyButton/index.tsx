"use client";

import { deleteRejectApplicant, getCheckStatus, postApply } from "@/apis/applicant";
import Button from "@/components/atoms/Button";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { getCookie } from "@/utils/Cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  postId: number;
  authorId: number;
}

function ApplyButton({ postId, authorId }: Props): JSX.Element | null {
  const router = useRouter();

  const [userId, setUserId] = useState<number | null>(null);

  const { data } = useQuery([`/api/posts/${postId}/applicants/check-status`, postId], () => getCheckStatus(postId), {
    enabled: !!userId,
  });

  const { mutate: applyMutate, queryClient } = useMutateWithQueryClient(postApply);
  const { mutate: deleteMutate } = useMutation({ mutationFn: deleteRejectApplicant });

  const [isApplied, setIsApplied] = useState<boolean | null>(null);

  useEffect(() => {
    setIsApplied(data?.data?.response.isApplied);
  }, [data]);

  useEffect(() => {
    if (getCookie("userId")) setUserId(parseInt(getCookie("userId"), 10));
    else setUserId(null);
  });

  const handleApply = () => {
    applyMutate(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries([`/api/posts/${postId}/applicants/check-status`, postId]);
        setIsApplied(true);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleDeleteApply = () => {
    deleteMutate(
      { postId, applicantId: data?.data?.response.applicantId },
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
  if (!userId) {
    return null;
  }

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

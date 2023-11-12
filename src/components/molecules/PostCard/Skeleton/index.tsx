import React from "react";

function Skeleton(): JSX.Element {
  return (
    <div className="flex flex-col gap-6 bg-white p-7 rounded-2xl shadow">
      <div className="w-3/4 h-6 animate-skeleton-gradient" />
      <div className="w-1/2 h-8 animate-skeleton-gradient" />
      <div className="flex w-full justify-between items-center">
        <div className="w-5/6">
          <div className="w-2/5 h-6 animate-skeleton-gradient" />
          <div className="mt-2 w-1/2 h-6 animate-skeleton-gradient" />
        </div>
        <div className="w-1/6 h-8 animate-skeleton-gradient" />
      </div>
    </div>
  );
}

function PostCardSkeleton(): JSX.Element {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}

export default PostCardSkeleton;

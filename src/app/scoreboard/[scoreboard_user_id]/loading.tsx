import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import React from "react";

function ScoreBoardLoading() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <LoadingSpinner styleType="xl" />
    </div>
  );
}

export default ScoreBoardLoading;

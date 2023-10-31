import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import React from "react";

function CreateLoading() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <LoadingSpinner styleType="xl" />
    </div>
  );
}

export default CreateLoading;

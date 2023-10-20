"use client";

import { MdWarningAmber, MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import { ToastData } from "@/types/toast";
import { useRecoilValue } from "recoil";
import toastState from "@/stores/atoms/toastState";
import ToastItem from "./ToastItem";

function Toast(): JSX.Element {
  const toastList = useRecoilValue(toastState);

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500";
      default:
        return "";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <MdCheckCircleOutline className="w-7 h-7" />;
      case "error":
        return <MdErrorOutline className="w-7 h-7" />;
      case "warning":
        return <MdWarningAmber className="w-7 h-7" />;
      default:
        return "";
    }
  };

  return (
    <div className="fixed right-5 bottom-5 flex flex-col z-10 gap-3">
      {toastList.map((item: ToastData) => (
        <ToastItem
          key={item.id}
          toastData={item}
          backgroundColor={getBackgroundColor(item.type)}
          icon={getIcon(item.type)}
        />
      ))}
    </div>
  );
}

export default Toast;

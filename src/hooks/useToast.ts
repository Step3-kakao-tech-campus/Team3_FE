import { useSetRecoilState } from "recoil";
import toastState from "@/stores/atoms/toastState";

export default function useToast() {
  const setToastList = useSetRecoilState(toastState);

  const addSuccessToast = (message: string) => {
    setToastList((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "success",
        message,
      },
    ]);
  };
  const addWarningToast = (message: string) => {
    setToastList((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "warning",
        message,
      },
    ]);
  };
  const addErrorToast = (message: string) => {
    setToastList((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "error",
        message,
      },
    ]);
  };

  return { addSuccessToast, addWarningToast, addErrorToast };
}

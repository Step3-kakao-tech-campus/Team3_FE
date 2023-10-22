import { ToastData } from "@/types/toast";
import { atom } from "recoil";

const toastState = atom<ToastData[]>({
  key: "toastState",
  default: [],
});

export default toastState;

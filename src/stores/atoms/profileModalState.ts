import { atom } from "recoil";

const profileModalState = atom<{
  isOpen: boolean;
  userId?: number;
}>({
  key: "profileModalState",
  default: { isOpen: false },
});

export default profileModalState;

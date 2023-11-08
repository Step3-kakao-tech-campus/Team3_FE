import getApiErrorMsg from "@/utils/getApiErrorMsg";
import useToast from "./useToast";

interface Param {
  err: unknown;
  alt: string;
}

export default function useApiErrorToast({ err, alt }: Param) {
  const { addErrorToast } = useToast();
  const errorMessage = getApiErrorMsg(err);
  if (errorMessage) addErrorToast(errorMessage);
  else addErrorToast(alt);
}

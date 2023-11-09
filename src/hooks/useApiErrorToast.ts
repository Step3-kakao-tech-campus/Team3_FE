import getApiErrorMsg from "@/utils/getApiErrorMsg";
import useToast from "./useToast";

interface Param {
  err: unknown;
  alt: string;
}

export default function useApiErrorToast() {
  const { addErrorToast } = useToast();
  const addApiErrorToast = ({ err, alt }: Param) => {
    const errorMessage = getApiErrorMsg(err);
    if (errorMessage) addErrorToast(errorMessage);
    else addErrorToast(alt);
  };

  return { addApiErrorToast };
}

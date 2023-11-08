export default function getApiErrorMsg(err: unknown) {
  return err.response?.data?.errorMessage;
}

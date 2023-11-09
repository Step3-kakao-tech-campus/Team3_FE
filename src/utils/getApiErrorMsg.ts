export default function getApiErrorMsg(err: unknown) {
  const error = err as any;
  return error.response?.data?.errorMessage;
}

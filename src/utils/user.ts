import { removeCookie, setCookie } from "@/utils/Cookie";

export const getTokenPayload = (token: string) => {
  const Parts = token.split(".")[1];
  const decoded = atob(Parts);
  const payload = JSON.parse(decoded);

  return payload;
};

export const setLogin = async (token: string) => {
  const payload = getTokenPayload(token);
  const maxAge = 3600 * 168;

  setCookie("token", token, { maxAge, path: "/" });
  setCookie("exp", payload.exp, { maxAge, path: "/" });
  setCookie("userId", payload.sub, { maxAge, path: "/" });
};

export const deleteToken = async () => {
  removeCookie("token");
  removeCookie("exp");
  removeCookie("userId");
};

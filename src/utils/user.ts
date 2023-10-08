import { removeCookie, setCookie } from "@/utils/Cookie";

export const getTokenPayload = (token: string) => {
  const Parts = token.split(".")[1];
  const decoded = atob(Parts);
  const payload = JSON.parse(decoded);

  return payload;
};

export const setLogin = async (email: string, token: string) => {
  const payload = getTokenPayload(token);
  const maxAge = 3600 * 168;

  setCookie("email", email, { maxAge });
  setCookie("token", token, { maxAge });
  setCookie("exp", payload.exp, { maxAge });
  setCookie("userId", payload.sub, { maxAge });
};

export const deleteToken = async () => {
  removeCookie("email");
  removeCookie("token");
  removeCookie("exp");
  removeCookie("userId");
};

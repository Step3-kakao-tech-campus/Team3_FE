import { removeCookie, setCookie } from "@/storage/Cookie";

export const setLogin = async (email: string, token: string) => {
  setCookie("email", email, { maxAge: 3600 * 168 });
  setCookie("token", token, { maxAge: 3600 * 168 });
};

export const deleteToken = async () => {
  removeCookie("email");
  removeCookie("token");
};

export const getTokenPayload = (token: string) => {
  const Parts = token.split(".")[1];
  const decoded = atob(Parts);
  const payload = JSON.parse(decoded);
  const expirationTime = payload.exp * 1000;
  const currentTimestamp = Date.now();

  if (currentTimestamp > expirationTime) {
    return null;
  }

  return payload;
};

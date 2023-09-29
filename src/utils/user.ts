import { removeCookie, setCookie } from "@/storage/Cookie";

export const setLogin = async (email: string, token: string, exp: number) => {
  const maxage = exp;
  const currentDate = new Date();
  const currentTimeInMilliseconds = currentDate.getTime();
  const currentTimeInSeconds = Math.floor(currentTimeInMilliseconds / 1000);

  const expirationTime = maxage - currentTimeInSeconds;
  console.log("maxage - currentTime", expirationTime);
  setCookie("email", email, { maxAge: expirationTime });
  setCookie("token", token, { maxAge: expirationTime });
};

export const logout = async () => {
  removeCookie("email");
  removeCookie("token");
  window.location.href = "/";
};

export const getTokenPayload = (token: string) => {
  const Parts = token.split(".")[1];
  const decoded = atob(Parts);
  const payload = JSON.parse(decoded);
  const expirationTime = payload.exp * 1000;
  const currentTimestamp = Date.now();

  if (currentTimestamp > expirationTime) {
    // expired

    return null;
  }

  return payload;
};

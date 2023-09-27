import { removeCookie, setCookie } from "@/storage/Cookie";

export const setLogin = async (email: string, token: string) => {
  setCookie("email", email, { maxAge: 3600 * 24 * 365 });
  setCookie("token", token, { maxAge: 3600 * 24 * 365 });
};

export const logout = async () => {
  removeCookie("email");
  removeCookie("token");
  window.location.href = "/";
};

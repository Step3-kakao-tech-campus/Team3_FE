import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  cookie.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookie.get(name);
};

export const removeCookie = (name: string) => {
  cookie.remove(name, { path: "/" });
};

export const getClientUserId = () => {
  return getCookie("userId");
};

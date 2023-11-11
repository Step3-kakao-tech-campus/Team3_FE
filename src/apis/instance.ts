import axios from "axios";
import { getCookie } from "@/utils/Cookie";
import { deleteToken, setLogin } from "@/utils/user";
import postAuthentication from "./auth";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 다른 도메인(Cross Origin)에 요청을 보낼 때 http -> https
});
const sourceRequest: any = {};

client.interceptors.request.use(async (config) => {
  const exp = getCookie("exp");
  const currentTime = Date.now() / 1000;
  const key = `${exp}`;
  if (currentTime >= exp && !sourceRequest[key]) {
    try {
      sourceRequest[key] = new Date();
      const res = await postAuthentication();
      setLogin(res.headers.authorization);
    } catch (e) {
      deleteToken();
      alert("토큰이 만료되어 다시 로그인이 필요합니다.");
      window.location.href = "/";
    }
  }

  const { headers } = config;
  const token = getCookie("token");
  if (token) {
    headers.Authorization = token;
  }

  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;

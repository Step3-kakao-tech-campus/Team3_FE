import axios from "axios";
import { getCookie } from "@/utils/Cookie";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 다른 도메인(Cross Origin)에 요청을 보낼 때 http -> https
});

instance.interceptors.request.use((config) => {
  const { headers } = config;
  const token = getCookie("token");
  if (token) {
    headers.Authorization = token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;

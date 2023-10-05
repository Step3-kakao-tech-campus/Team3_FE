import axios from "axios";
import { getCookie } from "@/utils/Cookie";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 다른 도메인(Cross Origin)에 요청을 보낼 때 http -> https
});

client.interceptors.request.use((config) => {
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

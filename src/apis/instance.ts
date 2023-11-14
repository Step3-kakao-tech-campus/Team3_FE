import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookie } from "@/utils/Cookie";
import { deleteToken, setLogin } from "@/utils/user";
import postAuthentication from "./auth";

type Token = string;
type Callback = (token: Token) => void;

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 다른 도메인(Cross Origin)에 요청을 보낼 때 http -> https
});

let isRefreshing = false;
let refreshSubscribers: Callback[] = [];

function subscribeTokenRefresh(cb: Callback) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token: Token) {
  refreshSubscribers.map((cb) => cb(token));
}

client.interceptors.request.use(async (config) => {
  const exp = getCookie("exp");
  const currentTime = Date.now() / 1000;

  const originalRequest = config;

  if (currentTime >= exp) {
    if (!isRefreshing) {
      isRefreshing = true;
      await postAuthentication()
        .then((res) => {
          isRefreshing = false;
          setLogin(res.headers.authorization);
          onRrefreshed(res.headers.authorization);
          refreshSubscribers = [];
        })
        .catch(() => {
          deleteToken();
          alert("토큰이 만료되어 다시 로그인이 필요합니다.");
          window.location.href = "/";
        });
    }

    const retryOrigReq = new Promise<InternalAxiosRequestConfig<any>>((resolve) => {
      subscribeTokenRefresh((token: Token) => {
        originalRequest.headers.Authorization = token;
        resolve(originalRequest);
      });
    });
    return retryOrigReq;
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

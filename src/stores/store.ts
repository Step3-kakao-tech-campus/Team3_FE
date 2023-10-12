import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST, PURGE } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import counterReducer from "./features/counterSlice";
// redux-persist failed to create sync storage. falling back to noop storage.
// SSR을 적용하고 나서, redux-persist가 서버사이드에서 동작할 때 발생한 이슈가 있었다.
// 서버사이드에서 정상 작동하도록 noop storage를 만들어주었다.
// https://github.com/rt2zz/redux-persist/issues/1208
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");
const persistConfig = {
  key: "root", // 저장될 키 이름
  storage, // 사용할 스토리지 (로컬 스토리지 또는 세션 스토리지)
  blacklist: ["register"],
};

const persistedReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Working with Non-Serializable Data
  // 미들웨어를 안해주면 정책상 객체가 아닌 데이터를 사용할 때 경고가 뜬다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

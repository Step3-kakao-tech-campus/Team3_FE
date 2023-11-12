import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    // react-query 전역 설정
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default queryClient;

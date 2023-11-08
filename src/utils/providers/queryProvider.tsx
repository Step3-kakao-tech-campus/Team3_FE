"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";

type Props = {
  children: React.ReactNode;
};

function QueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;

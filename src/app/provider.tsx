"use client";

import { getQueryClient } from "@/config/react-query.config";
import { wagmiConfig } from "@/config/wagmi.config";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export { Providers };

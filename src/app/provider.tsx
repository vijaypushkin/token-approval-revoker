"use client";

import { getQueryClient } from "@/config/react-query.config";
import { wagmiConfig } from "@/config/wagmi.config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import ThemeRegistry from "./ThemeRegistry";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeRegistry>
  );
};

export { Providers };

import { clientEnv } from "@/env/client.env";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

const wagmiConfig = getDefaultConfig({
  appName: "Token Approval Revoker",
  projectId: clientEnv.NEXT_PUBLIC_WC_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: true,
});

export { wagmiConfig };

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, bsc } from "wagmi/chains";

const wagmiConfig = getDefaultConfig({
  appName: "Token Approval Revoker",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, bsc],
  ssr: true,
});

export { wagmiConfig };

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

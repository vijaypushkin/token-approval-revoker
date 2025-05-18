import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygon } from "wagmi/chains";

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
});

export { wagmiConfig };

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

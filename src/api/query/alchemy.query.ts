import { useQuery } from "@tanstack/react-query";
import { getTokenBalances } from "@/api/alchemy/getTokenBalances";
import { useChainId } from "wagmi";

export const useTokenBalances = ({ address }: { address: string }) => {
  const chainId = useChainId();

  return useQuery({
    queryKey: ["alchemy", "tokenBalances", { address, chainId }],
    queryFn: () => getTokenBalances(address, chainId),
    enabled: !!address,
  });
};

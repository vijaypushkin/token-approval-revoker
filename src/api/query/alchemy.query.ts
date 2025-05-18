import { useQuery } from "@tanstack/react-query";
import { getTokenBalances } from "@/api/alchemy/getTokenBalances";

export const useTokenBalances = ({ address }: { address: string }) => {
  return useQuery({
    queryKey: ["alchemy", "tokenBalances", address],
    queryFn: () => getTokenBalances(address),
    enabled: !!address,
  });
};

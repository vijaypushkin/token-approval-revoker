"use server";

import wretch from "wretch";
import { env } from "@/env";
import { TokenBalance } from "@/types/api/alchemy.types";
import { TOKEN_DATA } from "@/data/token.data";

export interface TokenBalanceDatum extends TokenBalance {
  name: (typeof TOKEN_DATA.tokens)[number]["name"] | (string & {});
  symbol: (typeof TOKEN_DATA.tokens)[number]["symbol"] | null;
  decimals: number | null;
  image: (typeof TOKEN_DATA.tokens)[number]["logoURI"] | null;
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const getTokenBalances = async (
  address: string
): Promise<TokenBalanceDatum[]> => {
  const res = await wretch(
    `https://eth-mainnet.g.alchemy.com/v2/${env.NEXT_SERVER_ALCHEMY_API_KEY}`
  )
    .post({
      jsonrpc: "2.0",
      id: 1,
      method: "alchemy_getTokenBalances",
      params: [address],
    })
    .json<{
      result: {
        tokenBalances: TokenBalance[];
      };
    }>();

  const data = res.result.tokenBalances.map((token) => {
    const tokenData = TOKEN_DATA.tokens.find(
      (t) => t.address.toLowerCase() === token.contractAddress.toLowerCase()
    );

    return {
      ...token,
      name: tokenData?.name ?? shortenAddress(token.contractAddress),
      symbol: tokenData?.symbol ?? null,
      decimals: tokenData?.decimals ?? null,
      image: tokenData?.logoURI ?? null,
    };
  });

  return data;
};

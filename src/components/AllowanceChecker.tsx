"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  Typography,
  Stack,
  ListDivider,
  Link,
} from "@mui/joy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { erc20Abi, Hash } from "viem";
import { parseUnits } from "viem/utils";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import NextLink from "next/link";
import BigNumber from "bignumber.js";

interface AllowanceCheckerProps {
  userAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
  tokenSymbol: string | null;
  decimals?: number;
}

const explorerBaseUrl: Record<number, string> = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
  137: "https://polygonscan.com",
  10: "https://optimistic.etherscan.io",
  42161: "https://arbiscan.io",
};

const AllowanceChecker: React.FC<AllowanceCheckerProps> = ({
  userAddress,
  tokenAddress,
  tokenSymbol,
  decimals = 18,
}) => {
  const chainId = useChainId();
  const [input, setInput] = useState("");
  const [spender, setSpender] = useState<null | Hash>(null);
  const [adjustValue, setAdjustValue] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

  const [txType, setTxType] = useState<"set" | "revoke" | null>(null);

  const {
    data: allowance,
    refetch,
    isFetching: isChecking,
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [userAddress, spender as `0x${string}`],
    query: { enabled: Boolean(spender) },
  });

  const { data: contractName } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "name",
    query: { enabled: Boolean(spender) },
  });

  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
    query: {
      enabled: !!txHash,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTxHash(null);
      refetch(); // Refresh allowance after tx
    }
  }, [isSuccess, refetch]);

  const handleRevoke = async () => {
    if (!spender) {
      return void 0;
    }

    setTxType("revoke");
    const tx = await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, 0n],
    });
    setTxHash(tx);
  };

  const handleCheck = () => {
    if (input !== spender) {
      if (input.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        setSpender(input.toLowerCase() as Hash);
      }
    } else {
      refetch();
    }
  };

  const handleAdjust = async () => {
    setTxType("set");
    const value = parseUnits(adjustValue || "0", decimals);
    const tx = await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender as `0x${string}`, value],
    });
    setTxHash(tx);
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} mb={1}>
        <Input
          fullWidth
          size="md"
          placeholder="Spender address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          size="md"
          onClick={handleCheck}
          loading={Boolean(spender) && isChecking}
        >
          Check
        </Button>
      </Stack>

      {allowance !== undefined && (
        <Box mt={1}>
          <Typography level="body-md" mb={1}>
            Allowance for{" "}
            <Link
              component={NextLink}
              href={`${
                explorerBaseUrl[chainId] ?? "https://etherscan.io"
              }/address/${tokenAddress}`}
              target="_blank"
              color="primary"
              rel="noopener noreferrer"
            >
              {contractName ?? "Unknown Contract"}{" "}
              <OpenInNewIcon sx={{ width: 14, height: 14 }} />
            </Link>
            :{" "}
            {BigNumber(allowance)
              .dividedBy(new BigNumber(10).pow(decimals))
              .toFormat(4)}{" "}
            {tokenSymbol}
          </Typography>

          <ListDivider
            orientation="horizontal"
            sx={{ display: { xs: "block", sm: "none " } }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            mt={1}
            justifyContent={"flex-end"}
          >
            <Stack direction="row" spacing={1}>
              <Input
                size="md"
                placeholder="Adjust value"
                value={adjustValue}
                onChange={(e) => setAdjustValue(e.target.value)}
              />
              <Button
                size="md"
                onClick={handleAdjust}
                loading={txType === "set" && (isWriting || isWaiting)}
              >
                Set
              </Button>
            </Stack>

            <ListDivider
              orientation="vertical"
              sx={{ display: { xs: "none", sm: "block" } }}
            />

            <Button
              size="md"
              color="danger"
              onClick={handleRevoke}
              loading={txType === "revoke" && (isWriting || isWaiting)}
            >
              Revoke
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export { AllowanceChecker };

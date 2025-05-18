"use client";

import { useState } from "react";
import { Box, Input, Button, Typography, Stack } from "@mui/joy";
import { erc20Abi } from "viem";
import { parseUnits } from "viem/utils";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

type Props = {
  userAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
  decimals?: number;
};

export function AllowanceChecker({
  userAddress,
  tokenAddress,
  decimals = 18,
}: Props) {
  const [spender, setSpender] = useState("");
  const [adjustValue, setAdjustValue] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

  const {
    data: allowance,
    refetch,
    isPending: isChecking,
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [userAddress, spender as `0x${string}`],
    query: { enabled: false },
  });

  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const { isLoading: isWaiting } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
    query: {
      // onSettled: () => {
      //   setTxHash(null);
      //   refetch(); // Refresh allowance after tx
      // },
      enabled: !!txHash,
    },
  });

  const handleRevoke = async () => {
    const tx = await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender as `0x${string}`, 0n],
    });
    setTxHash(tx);
  };

  const handleAdjust = async () => {
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
          size="sm"
          placeholder="Spender address"
          value={spender}
          onChange={(e) => setSpender(e.target.value)}
        />
        <Button size="sm" onClick={() => refetch()} loading={isChecking}>
          Check
        </Button>
      </Stack>

      {allowance !== undefined && (
        <Box mt={1}>
          <Typography level="body-sm" mb={1}>
            Allowance: {BigInt(allowance).toString()}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="sm"
              color="danger"
              onClick={handleRevoke}
              loading={isWriting || isWaiting}
            >
              Revoke
            </Button>
            <Input
              size="sm"
              placeholder="Adjust value"
              value={adjustValue}
              onChange={(e) => setAdjustValue(e.target.value)}
            />
            <Button
              size="sm"
              onClick={handleAdjust}
              loading={isWriting || isWaiting}
            >
              Set
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

"use client";

import { Typography, Box, IconButton } from "@mui/joy";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { useTokenBalances } from "@/api/query/alchemy.query";

import { TokenBalanceDatum } from "@/api/alchemy/getTokenBalances";
import { formatUnits, Hash } from "viem";
import Image from "next/image";
import { useMemo, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { AllowanceChecker } from "./AllowanceChecker";
import { DataTableSkeleton } from "./DataTableSkeleton";

const columnHelper = createColumnHelper<TokenBalanceDatum>();
export const ApprovalsTable: React.FC<{ address: string }> = ({ address }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const columns = useMemo(
    () =>
      [
        columnHelper.display({
          id: "token",
          header: "Token",
          cell: ({ row }) => {
            const { image, name, symbol } = row.original;
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {image ? (
                  <Image
                    src={image}
                    alt={symbol ?? name}
                    width={24}
                    height={24}
                    style={{ borderRadius: "50%" }}
                    unoptimized
                  />
                ) : (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: "blue.100",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Typography level="body-sm">
                  {name} {symbol && `(${symbol})`}
                </Typography>
              </Box>
            );
          },
        }),

        columnHelper.accessor("tokenBalance", {
          header: "Amount",
          cell: (info) => {
            const { tokenBalance, decimals } = info.row.original;
            if (!decimals) return "-";
            return formatUnits(BigInt(tokenBalance), decimals);
          },
        }),

        columnHelper.display({
          id: "actions",

          size: 48,
          cell: ({ row }) => {
            const isExpanded = expandedIndex === row.index;
            return (
              <IconButton
                size="sm"
                variant="outlined"
                onClick={() => setExpandedIndex(isExpanded ? null : row.index)}
              >
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            );
          },
        }),
      ] as ColumnDef<TokenBalanceDatum, string | React.ReactNode>[],
    [expandedIndex]
  );

  const { data } = useTokenBalances({ address });

  if (!data) {
    return <DataTableSkeleton />;
  }

  return (
    <DataTable<TokenBalanceDatum>
      columns={columns}
      data={data}
      expandedRowIndex={expandedIndex}
      renderExpandedRow={(row) => (
        <Box sx={{ p: 2, bgcolor: "background.level1" }}>
          <AllowanceChecker
            userAddress={address as `0x${string}`}
            tokenAddress={row.contractAddress as Hash}
            decimals={row.decimals ?? undefined}
            tokenSymbol={row.symbol}
          />
        </Box>
      )}
    />
  );
};

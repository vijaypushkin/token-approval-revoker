"use client";

import { useMemo } from "react";
import { Typography, Button } from "@mui/joy";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

type Approval = {
  token: string;
  spender: string;
  amount: string;
  tokenAddress: string;
};

const columnHelper = createColumnHelper<Approval>();

const columns = [
  columnHelper.accessor("token", {
    id: "token",
    header: "Token",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("spender", {
    header: "Spender",
    cell: (info) => (
      <Typography level="body-sm">
        {info.getValue().slice(0, 6)}...{info.getValue().slice(-4)}
      </Typography>
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Button
        size="sm"
        color="danger"
        onClick={() => console.log("Revoke", row.original)}
      >
        Revoke
      </Button>
    ),
  }),
] as ColumnDef<Approval, string | React.ReactNode>[];

export const ApprovalsTable = () => {
  const data = useMemo<Approval[]>(
    () => [
      {
        token: "USDC",
        spender: "0xAbC123456789abcdef",
        amount: "1000.00",
        tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      {
        token: "DAI",
        spender: "0xDef456789abcdef123",
        amount: "500.50",
        tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      },
    ],
    []
  );

  return <DataTable<Approval> columns={columns} data={data} />;
};

"use client";

import { ApprovalsTable } from "@/components/ApprovalTable";
import { Box, Typography } from "@mui/joy";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function AddressPage() {
  const { address } = useAccount();

  if (address == null) {
    return (
      <Box component="main" sx={{ px: 3, py: 4, maxWidth: 960, mx: "auto" }}>
        <Typography level="h2" mb={2}>
          Token Approval Revoker
        </Typography>
        <Typography level="body-md" mb={4}>
          View and revoke token approvals from any Ethereum address. Stay safe
          and protect your assets from malicious spenders.
        </Typography>
        <ConnectButton />
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ px: 3, py: 4, maxWidth: 960, mx: "auto" }}>
      <ApprovalsTable address={address} />
    </Box>
  );
}

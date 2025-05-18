import { Box, Button, Sheet, Typography } from "@mui/joy";
import Link from "next/link";

export default function Home() {
  return (
    <Box component="main" sx={{ px: 3, py: 4, maxWidth: 960, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10, px: 2 }}>
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 600,
            width: "100%",
            p: 4,
            borderRadius: "md",
            textAlign: "center",
          }}
        >
          <Typography level="h2" mb={2}>
            Token Approval Revoker
          </Typography>
          <Typography level="body-md" mb={4}>
            View and revoke token approvals from any Ethereum address. Stay safe
            and protect your assets from malicious spenders.
          </Typography>
          <Button
            component={Link}
            href="/address" // Replace or dynamically handle
            size="lg"
            variant="solid"
          >
            Enter Your Address
          </Button>
        </Sheet>
      </Box>
    </Box>
  );
}

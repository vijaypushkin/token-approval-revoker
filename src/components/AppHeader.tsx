import { Sheet, Typography } from "@mui/joy";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const AppHeader = () => (
  <header>
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Typography level="h4" color="neutral">
        Token Revoker
      </Typography>
      <ConnectButton />
    </Sheet>
  </header>
);

export { AppHeader };

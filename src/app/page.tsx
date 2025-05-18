import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { ApprovalsTable } from "@/components/ApprovalTable";
import { Box } from "@mui/joy";

export default function Home() {
  return (
    <div>
      <AppHeader />
      <Box component="main" sx={{ px: 3, py: 4, maxWidth: 960, mx: "auto" }}>
        <ApprovalsTable />
      </Box>
      <AppFooter />
    </div>
  );
}

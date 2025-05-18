import { Sheet, Typography, Stack, IconButton, Link } from "@mui/joy";
import NextLink from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const AppFooter = () => (
  <footer>
    <Sheet
      variant="plain"
      sx={{
        mt: "auto",
        px: 2,
        py: 3,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography level="body-sm" mb={1}>
        Made with <span style={{ color: "red" }}>♥</span> by Vijay Pushkin
      </Typography>

      <Typography level="body-sm" mb={1}>
        Donate:{" "}
        <Link
          component={NextLink}
          href="https://etherscan.io/address/0xb0DebcB643eE79f19Ef659Bd01D0FAC12d058604"
          target="_blank"
          rel="noopener noreferrer"
        >
          vijaypushkin.eth
        </Link>
      </Typography>

      <Typography level="body-sm" mb={2}>
        Find the source code on{" "}
        <Link
          component={NextLink}
          href="https://github.com/vijaypushkin/token-approval-revoker"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={1}>
        <IconButton
          component={NextLink}
          href="https://github.com/vijaypushkin"
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          variant="outlined"
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
        <IconButton
          component={NextLink}
          href="https://linkedin.com/in/vijaypushkin"
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          variant="outlined"
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Typography level="body-xs" mt={2} color="neutral">
        Built with{" "}
        <Link
          component={NextLink}
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          component={NextLink}
          href="https://wagmi.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          wagmi
        </Link>
        ,{" "}
        <Link
          component={NextLink}
          href="https://viem.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          viem
        </Link>
        ,{" "}
        <Link
          component={NextLink}
          href="https://mui.com/joy-ui/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Joy UI
        </Link>
        ,{" "}
        <Link
          component={NextLink}
          href="https://tanstack.com/query"
          target="_blank"
          rel="noopener noreferrer"
        >
          TanStack Query
        </Link>
        ,{" "}
        <Link
          component={NextLink}
          href="https://tanstack.com/table"
          target="_blank"
          rel="noopener noreferrer"
        >
          TanStack Table
        </Link>
        , and{" "}
        <Link
          component={NextLink}
          href="https://www.alchemy.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alchemy
        </Link>
        .
      </Typography>

      <Typography level="body-xs" mt={2} color="neutral">
        © {new Date().getFullYear()} Vijay Pushkin. All rights reserved.
      </Typography>
    </Sheet>
  </footer>
);

export { AppFooter };

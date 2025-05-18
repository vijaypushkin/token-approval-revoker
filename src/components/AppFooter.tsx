import { Sheet, Typography, Stack, IconButton } from "@mui/joy";

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
      <Stack direction="row" justifyContent="center" spacing={1}>
        <IconButton
          component="a"
          href="https://github.com/vijaypushkin"
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          variant="outlined"
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com/in/vijaypushkin"
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          variant="outlined"
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Sheet>
  </footer>
);

export { AppFooter };

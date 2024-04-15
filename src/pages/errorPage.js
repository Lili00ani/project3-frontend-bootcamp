//-----------Libraries-----------//
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

//-----------Components-----------//
import theme from "../theme";

export default function ErrorPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5vh",
          height: "90vh",
          backgroundColor: "#E5F3E8",
        }}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: 20, fontWeight: "bold" }}
        >
          Error
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          fullWidth
          sx={{ color: "primary", fontSize: "1 rem" }}
        >
          Go Back to Homepage
        </Button>
      </Box>
    </ThemeProvider>
  );
}

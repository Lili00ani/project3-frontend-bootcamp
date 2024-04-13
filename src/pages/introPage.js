//-----------Libraries-----------//
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

//-----------Components-----------//
import theme from "../theme";

export default function IntroPage() {
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
        <img
          src={`${process.env.PUBLIC_URL}/cover.png`}
          alt="Coverpage"
          style={{ marginBottom: 20, maxWidth: "100%" }}
        />

        <Typography
          variant="h4"
          style={{ marginBottom: 20, fontWeight: "bold" }}
        >
          Find Your Community Events Anywhere
        </Typography>
        <Button
          component={Link}
          to="/home"
          variant="contained"
          fullWidth
          sx={{ color: "primary", fontSize: "1 rem" }}
        >
          Explore events
        </Button>
      </Box>
    </ThemeProvider>
  );
}

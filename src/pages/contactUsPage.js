//-----------Libraries-----------//
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

//-----------Components-----------//
import theme from "../theme";

export default function ContactUsPage() {
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
          Contact Us
        </Typography>
        <Typography variant="body2" style={{ marginBottom: 20 }}>
          Email us at eventlink@gmail.com
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

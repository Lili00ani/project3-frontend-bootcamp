//-----------Libraries-----------//
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

//-----------Components-----------//

export default function Redirect({ title }) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          padding: "5vh",
          height: "70vh",
        }}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: 20, fontWeight: "bold" }}
        >
          Looking for your {title}?
        </Typography>
        <Typography variant="body2" style={{ marginBottom: 20 }}>
          Log into your account
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

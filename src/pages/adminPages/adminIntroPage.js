//-----------Libraries-----------//
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//-----------Components-----------//
import theme from "../../theme";

export default function AdminIntroPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/admin/home");
    } else {
      loginWithRedirect();
    }
  };

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
          Create Your Community Events Anywhere
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ color: "primary", fontSize: "1rem" }}
          onClick={handleLogin}
        >
          {isAuthenticated ? "Continue to Admin" : "Login"}
        </Button>
      </Box>
    </ThemeProvider>
  );
}

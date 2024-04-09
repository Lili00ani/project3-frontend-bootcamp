//-----------Libraries-----------//
import { useState, useEffect } from "react";
<<<<<<< HEAD
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
//-----------Components-----------//
import EventPreviewList from "../../components/EventPreviewList";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth0 } from "@auth0/auth0-react";
=======
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import Typography from "@mui/material/Typography";

//-----------Components-----------//
import EventPreviewList from "../../components/EventPreviewList";
import SearchBar from "../../components/searchBar";

>>>>>>> 8d6a58a5e491ca15f55d3d6c85ba08203453c730
export default function HomePage() {
  const {
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated,
    logout,
    isLoading,
    user,
  } = useAuth0();
  if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} xl={6}>
            <Paper
              style={{
                padding: "2rem",
                borderRadius: "4px",
                backgroundColor: "#fff",
                border: "none",
                boxShadow: "none",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={true}
                style={{
                  color: "#fff",
                  backgroundColor: "#486453",
                  borderRadius: "4px",
                  padding: ".5rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    margin: "auto",
                    fontSize: "16px",
                  }}
                >
                  Loading...
                </span>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
<<<<<<< HEAD
    <div>
      {!isAuthenticated ? (
        <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} xl={6}>
              <Paper
                style={{
                  padding: "2rem",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => loginWithRedirect()}
                  style={{
                    color: "#fff",
                    backgroundColor: "#486453",
                    borderRadius: "4px",
                    padding: ".5rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      margin: "auto",
                      fontSize: "16px",
                    }}
                  >
                    Sign In
                  </span>
                  <div
                    style={{
                      backgroundColor: "#68C598",
                      borderRadius: "50%",
                      padding: "0.5rem",
                      marginLeft: "0.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ArrowForwardIcon />
                  </div>
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      ) : (
        <EventPreviewList />
      )}
    </div>
=======
    <ThemeProvider theme={theme}>
      <SearchBar />

      <div
        style={{
          position: "fixed",
          top: "20vh",
          height: "70vh",
          width: "100%",
          overflowY: "scroll",
          marginBottom: "20vw",
        }}
      >
        <EventPreviewList />
      </div>
    </ThemeProvider>
>>>>>>> 8d6a58a5e491ca15f55d3d6c85ba08203453c730
  );
}

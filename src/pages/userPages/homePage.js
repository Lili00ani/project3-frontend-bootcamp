//-----------Libraries-----------//
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
//-----------Components-----------//
import EventPreviewList from "../../components/EventPreviewList";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth0 } from "@auth0/auth0-react";
export default function HomePage() {
  const {
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated,
    logout,
    isLoading,
    user,
  } = useAuth0();
  return (
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
  );
}

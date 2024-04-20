//-----------Libraries-----------//
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import {
  Box,
  Grid,
  Button,
  Card,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import theme from "../../theme";

export default function FreeReturnPage() {
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const eventId = location.state.eventId;
  const user_id = location.state.user_id;
  const quantity_bought = location.state.quantity;
  const [isExploding, setIsExploding] = useState(false);
  const [event, setEvent] = useState();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState();

  const formatDate = (string) => {
    const date = new Date(string);
    const options = {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatHour = (string) => {
    const date = new Date(string);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleTimeString("en-US", options);
  };

  const mediumProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 200,
    width: 1600,
  };

  const checkUser = async () => {
    if (isAuthenticated) {
      try {
        let token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, [isAuthenticated]);

  useEffect(() => {
    axios
      .post(
        `${BACKEND_URL}/bookings/${eventId}`,
        {
          eventId: eventId,
          quantity_bought: quantity_bought,
          user_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setStatus("complete");
        setIsExploding("true");
      })
      .catch((error) => {
        console.error("Error inserting data", error);
      });
  }, [eventId, quantity_bought, user_id]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/events/${eventId}`)

      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {status === "complete" ? (
        <>
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
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Hooray! You're in.
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 20 }}>
              Your event reservation is complete
            </Typography>
            <Card sx={{ marginBottom: "5vh" }}>
              <Grid sx={{ padding: "2vh" }}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    paragraph
                    style={{ fontWeight: "bold" }}
                  >
                    {event.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" style={{ marginBottom: 20 }}>
                    {new Date(event.start).toLocaleString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                    -
                    {new Date(event.end).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            {isExploding && <ConfettiExplosion {...mediumProps} />}
            <Button
              component={Link}
              to="/home"
              variant="contained"
              color="primary"
            >
              Return to Homepage
            </Button>
          </Box>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </ThemeProvider>
  );
}

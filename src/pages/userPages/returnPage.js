//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BrowserRouter as Router, Navigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  ThemeProvider,
} from "@mui/material";
import ConfettiExplosion from "react-confetti-explosion";
import { useAuth0 } from "@auth0/auth0-react";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import theme from "../../theme";

const stripePromise = loadStripe(
  "pk_test_51OyC8VEkRpzvMxvMLDTzSAtzYuI8Aj98G0UQ3IkjB4ERSxgMQKMb9RNDz0LUq30pttvyJo0TsbnZVVZDxdP8SnIy000n2nrCq9"
);

export default function ReturnPage() {
  const [status, setStatus] = useState(null);
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  const [isExploding, setIsExploding] = useState(false);
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
    const fetchData = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get("session_id");
        const eventId = urlParams.get("eventId");
        const quantity = urlParams.get("quantity");
        const user = urlParams.get("user");

        const response = await axios.get(
          `http://localhost:3000/bookings/session-status?session_id=${sessionId}&eventId=${eventId}&quantity=${quantity}&user=${user}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setStatus(response.data.status);
        setLoading(false);
        setIsExploding("true");
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Status updated:", status);
  }, [status]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eventId = urlParams.get("eventId");
    axios
      .get(`${BACKEND_URL}/events/${eventId}`)

      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Display confirmation message or redirect based on status
  if (status === "complete") {
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
      </ThemeProvider>
    );
  } else if (status === "open") {
    return <Navigate to="/checkout" />;
  } else {
    return <p>Status: {status}</p>;
  }
}

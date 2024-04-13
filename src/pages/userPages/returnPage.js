import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BrowserRouter as Router, Navigate, Link } from "react-router-dom";
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import ConfettiExplosion from "react-confetti-explosion";

import { BACKEND_URL } from "../../constant.js";
import theme from "../../theme";

const stripePromise = loadStripe(
  "pk_test_51OyC8VEkRpzvMxvMLDTzSAtzYuI8Aj98G0UQ3IkjB4ERSxgMQKMb9RNDz0LUq30pttvyJo0TsbnZVVZDxdP8SnIy000n2nrCq9"
);

export default function ReturnPage() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isExploding, setIsExploding] = useState(false);

  const mediumProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 200,
    width: 1600,
  };

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
          `http://localhost:3000/bookings/session-status?session_id=${sessionId}&eventId=${eventId}&quantity=${quantity}&user=${user}`
        );

        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
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

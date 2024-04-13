import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import { Box, Button, Typography, ThemeProvider } from "@mui/material";

import { BACKEND_URL } from "../../constant.js";
import theme from "../../theme";

export default function FreeReturnPage() {
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const eventId = location.state.eventId;
  const user_id = location.state.user_id;
  const quantity_bought = location.state.quantity;
  const [isExploding, setIsExploding] = useState(false);

  const mediumProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 200,
    width: 1600,
  };

  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/bookings/${eventId}`, {
        eventId: eventId,
        quantity_bought: quantity_bought,
        user_id: user_id,
      })
      .then((response) => {
        setStatus("complete");
        setIsExploding("true");
      })
      .catch((error) => {
        console.error("Error inserting data", error);
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

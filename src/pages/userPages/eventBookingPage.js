//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import theme from "../../theme";

export default function EventBookingPage({ eventId, isFree }) {
  const [quantity, setQuantity] = useState(1);
  const [capacity, setCapacity] = useState();
  const [event, setEvent] = useState();
  const [userDb, setUserDb] = useState();
  const [accessToken, setAccessToken] = useState();
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/bookings/capacity/${eventId}`
        );

        setCapacity(response.data.availableCapacity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  const fetchData = async () => {
    try {
      if (user && user.email) {
        const response = await axios.post(`${BACKEND_URL}/users/`, {
          email: user.email,
        });
        const output = response.data;
        setUserDb(output);
      } else {
        console.log("User email is undefined.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkUser = async () => {
    if (isAuthenticated) {
      let token = await getAccessTokenSilently();
      setAccessToken(token);
      fetchData();
    } else {
      loginWithRedirect();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleIncrement = () => {
    if (quantity < capacity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = event && event.price * quantity;
  const displayPrice = totalPrice === 0 ? "Free" : `$ ${totalPrice}`;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          margin: "30px",
          width: "68vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" paragraph>
          Number of Tickets
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button onClick={handleDecrement}>-</Button>
          <Typography variant="h3" sx={{ margin: "5vw" }}>
            {quantity}
          </Typography>
          <Button onClick={handleIncrement}>+</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" paragraph>
            Total
          </Typography>
          <Typography variant="h5" gutterBottom>
            {displayPrice}
          </Typography>
        </Box>

        <Box sx={{ margin: "30px", display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            to={isFree ? "/free-return" : "/checkout"}
            state={{
              eventId: eventId,
              quantity: quantity,
              user_id: userDb && userDb.length > 0 ? userDb[0].id : null,
            }}
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

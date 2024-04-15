import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Typography, ThemeProvider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import theme from "../../theme";
import { BACKEND_URL } from "../../constant.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AdminEventPage() {
  const [bookings, setBookings] = useState([]);
  const [eventId, setEventId] = useState();

  const fetchBookingsForEvent = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/bookings/${eventId}`);
      const { bookings } = response.data;

      setBookings(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const params = useParams();
  if (eventId !== params.eventId) {
    setEventId(params.eventId);
  }

  console.log(bookings);
  useEffect(() => {
    if (eventId) {
      fetchBookingsForEvent();
    }
  }, [eventId]);

  const bookingList =
    bookings.length > 0 ? (
      <Box>
        {bookings.map((booking) => (
          <Box key={booking.id} sx={{ marginTop: 2 }}>
            <Typography variant="body2">User: {booking.user.email}</Typography>
            <Typography variant="body2">
              Quantity Bought: {booking.quantity_bought}
            </Typography>
          </Box>
        ))}
      </Box>
    ) : (
      <Box
        sx={{
          height: "80vh",
          paddingTop: "25vh",
        }}
      >
        <CardMedia
          sx={{
            height: "40vh",
            borderRadius: 3,
            objectFit: "contain",
            objectPosition: "center",
          }}
          image={`${process.env.PUBLIC_URL}/blank/blank.png`}
          title="emptystate"
        ></CardMedia>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            paddingTop: "8px",
            display: "flex",

            justifyContent: "center",
          }}
        >
          No one has booked yet.
        </Typography>
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "fixed",
          top: "5vw",
          left: "5vw",
          zIndex: 9999,
        }}
      >
        <Link to="/admin/home">
          <ArrowBackIcon />
        </Link>
      </Box>
      {bookingList}
    </ThemeProvider>
  );
}

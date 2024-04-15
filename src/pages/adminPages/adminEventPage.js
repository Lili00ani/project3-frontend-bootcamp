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
  const [capacity, setCapacity] = useState();
  const [event, setEvent] = useState();

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

  useEffect(() => {
    if (eventId) {
      fetchBookingsForEvent();
    }
  }, [eventId]);

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

  const bookingList =
    bookings.length > 0 ? (
      <Card>
        {bookings.map((booking) => (
          <Box key={booking.id} sx={{ padding: "2vh" }}>
            <Typography variant="body2">User: {booking.user.email}</Typography>
            <Typography variant="body2">
              Quantity Bought: {booking.quantity_bought}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 11 }}>
              BookingId: {booking.id}
            </Typography>
          </Box>
        ))}
      </Card>
    ) : (
      <Box
        sx={{
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
      <Box sx={{ height: "5vh" }}></Box>

      <Box sx={{ padding: "5vh" }}>
        {event && <Typography>Total slots: {event.capacity}</Typography>}
        {capacity && <Typography>Slots left: {capacity}</Typography>}
      </Box>
      <Box sx={{ paddingLeft: "5vh", paddingRight: "5vh" }}>{bookingList}</Box>
    </ThemeProvider>
  );
}

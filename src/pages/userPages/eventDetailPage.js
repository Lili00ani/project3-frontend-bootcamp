//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Grid } from "@mui/material";

//-----------Components-----------//
import EventBookingPage from "./eventBookingPage";
import { BACKEND_URL } from "../../constant.js";

export default function EventDetailPage() {
  const [event, setEvent] = useState();
  const [eventId, setEventId] = useState();
  const [showRegistration, setShowRegistraton] = useState(null);
  const [isFree, setIsFree] = useState(null);
  const { user, loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/events/${eventId}`);
        setEvent(response.data);
        setIsFree(response.data.price === 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  // Update eventID in state if needed to trigger data retrieval
  const params = useParams();
  if (eventId !== params.eventId) {
    setEventId(params.eventId);
  }

  const handleClickOpen = async () => {
    if (!isAuthenticated) {
      return loginWithRedirect();
    }
    setShowRegistraton(true);
  };

  const handleClose = () => {
    setShowRegistraton(false);
  };

  //add image
  const eventInfo = event ? (
    <Box sx={{ margin: "30px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {event.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            Price: ${event.price}
          </Typography>
        </Grid>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginLeft: "15px" }}
        >
          <Button variant="contained" onClick={handleClickOpen}>
            Book
          </Button>
        </Box>

        <Grid item xs={12}>
          <Typography variant="body1">
            Language: {event.language.name}
          </Typography>
          <Typography variant="body1">
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
          <Typography variant="body1">{event.admin.name}</Typography>
          <Typography variant="body1">{event.venue.address}</Typography>
        </Grid>
      </Grid>
    </Box>
  ) : null;

  return (
    <div>
      {eventInfo}

      {showRegistration && (
        <Dialog open={showRegistration} onClose={handleClose}>
          <EventBookingPage eventId={eventId} isFree={isFree} />
        </Dialog>
      )}
    </div>
  );
}

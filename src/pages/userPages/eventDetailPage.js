//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Grid } from "@mui/material";
import { createRoot } from "react-dom/client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

//-----------Components-----------//
import EventBookingPage from "./eventBookingPage";
import { BACKEND_URL } from "../../constant.js";

const API_KEY = String(process.env.GOOGLE_MAPS_API_KEY);

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

        <APIProvider apiKey="AIzaSyC7kF4orTaXdxWzTdpjcEXeLNp33fvcEOM">
          <Map
            mapId={"bf51a910020fa25a"}
            style={{ width: "100vw", height: "30vh" }}
            defaultCenter={{
              lat: parseFloat(event.venue.lat),
              lng: parseFloat(event.venue.lng),
            }}
            defaultZoom={13}
            gestureHandling={"greedy"}
            disableDefaultUI={false}
          >
            <AdvancedMarker
              position={{
                lat: parseFloat(event.venue.lat),
                lng: parseFloat(event.venue.lng),
              }}
              title={"AdvancedMarker with customized pin."}
            >
              <Pin
                background={"#22ccff"}
                borderColor={"#1e89a1"}
                glyphColor={"#0f677a"}
              ></Pin>
            </AdvancedMarker>
          </Map>
        </APIProvider>
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
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      {eventInfo}

      {showRegistration && (
        <Dialog open={showRegistration} onClose={handleClose}>
          <EventBookingPage eventId={eventId} isFree={isFree} />
        </Dialog>
      )}
    </div>
  );
}

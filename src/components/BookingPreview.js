//-----------Libraries-----------//
import { Card, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

const BookingPreview = (props) => {
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

  //add logic to see whether start and end date is the same.
  const formatHour = (string) => {
    const date = new Date(string);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <Card sx={{ margin: "5vh", borderRadius: 4 }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId={"bookingpreview"}
          style={{ width: "90vw", height: "20vh" }}
          defaultCenter={{
            lat: parseFloat(props.data.event.venue.lat),
            lng: parseFloat(props.data.event.venue.lng),
          }}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <AdvancedMarker
            position={{
              lat: parseFloat(props.data.event.venue.lat),
              lng: parseFloat(props.data.event.venue.lng),
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
      <Box sx={{ margin: "10px" }}>
        <Link
          to={`/events/${props.data.event.id}`}
          key={props.data.event.id}
          style={{ display: "block", textDecoration: "none" }}
        >
          <Typography variant="body2" sx={{ marginTop: "1vh" }}>
            {formatDate(props.data.event.start)}-
            {formatHour(props.data.event.end)}
          </Typography>

          <Typography variant="h5">{props.data.event.title}</Typography>
        </Link>
        <Typography variant="body2">
          {props.data.event.venue.address}
        </Typography>

        <Typography variant="body2">
          Quantity :{props.data.quantity_bought}
        </Typography>
      </Box>
    </Card>
  );
};

export default BookingPreview;

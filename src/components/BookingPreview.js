//-----------Libraries-----------//
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
    <Card sx={{ margin: "20px", borderRadius: 5 }}>
      <CardContent>
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <Map
            mapId={"bookingpreview"}
            style={{ width: "80vw", height: "20vh" }}
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
        <Link
          to={`/events/${props.data.event.id}`}
          key={props.data.event.id}
          style={{ display: "block", textDecoration: "none" }}
        >
          <Typography variant="body2" color="text.secondary">
            {formatDate(props.data.event.start)}-
            {formatHour(props.data.event.end)}
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            {props.data.event.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            BookingId :${props.data.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity :{props.data.quantity_bought}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BookingPreview;

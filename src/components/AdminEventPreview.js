//-----------Libraries-----------//
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const EventPreview = (props) => {
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

  const priceText = props.data.price === 0 ? "Free" : `$${props.data.price}`;

  console.log(props);

  return (
    <Card sx={{ margin: "20px", borderRadius: 5 }}>
      <CardContent>
        <>
          <CardMedia
            sx={{
              height: 120,
              borderRadius: 3,
              objectFit: "contain",
              objectPosition: "center",
            }}
            image={props.data.image_link}
            title={props.data.id}
          ></CardMedia>
          {/* <Link
            to={`/events/${props.data.id}`}
            key={props.data.id}
            style={{ display: "block", textDecoration: "none" }}
          > */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: "8px" }}
          >
            {formatDate(props.data.start)}-{formatHour(props.data.end)}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ padding: "0px", margin: "0px" }}
              >
                {props.data.title}
              </Typography>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <Typography
                gutterBottom
                variant="h6"
                color="text.primary"
                sx={{ padding: "0px", margin: "0px" }}
              >
                {priceText}
              </Typography>
            </div>
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: "8px" }}
          >
            {props.data.status.name}
          </Typography>
          {/* </Link> */}
        </>
      </CardContent>
    </Card>
  );
};

export default EventPreview;

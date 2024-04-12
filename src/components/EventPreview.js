//-----------Libraries-----------//
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TurnedInTwoToneIcon from "@mui/icons-material/TurnedInTwoTone";
import PlaceIcon from "@mui/icons-material/Place";

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

  return (
    <Card sx={{ margin: "20px", borderRadius: 5 }}>
      <CardContent>
        <>
          <CardMedia
            sx={{ height: 120, position: "relative", borderRadius: 3 }}
            image={`${process.env.PUBLIC_URL}/shoes.jpg`}
            title="shoes"
          >
            {/* <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
              <Button
                size="small"
                variant="contained"
                sx={{ padding: 0.2, minWidth: "25px" }}
              >
                <TurnedInTwoToneIcon />
              </Button>
            </CardActions> */}
          </CardMedia>
          <Link
            to={`/events/${props.data.id}`}
            key={props.data.id}
            style={{ display: "block", textDecoration: "none" }}
          >
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
              sx={{ padding: "0px", margin: "0px" }}
            >
              {/* <PlaceIcon style={{ fontSize: "medium" }} /> */}
              {props.data.admin.name}
            </Typography>
          </Link>
        </>
      </CardContent>
    </Card>
  );
};

export default EventPreview;

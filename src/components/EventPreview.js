//-----------Libraries-----------//
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
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

  return (
    <Card sx={{ margin: "30px" }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <>
          <Link
            to={`/events/${props.data.id}`}
            key={props.data.id}
            style={{ display: "block", textDecoration: "none" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {props.data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.data.admin.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(props.data.start)}-{formatHour(props.data.end)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${props.data.price}
            </Typography>
          </Link>
        </>
      </CardContent>
      <CardActions>
        <Button size="small">Bookmark</Button>
      </CardActions>
    </Card>
  );
};

export default EventPreview;

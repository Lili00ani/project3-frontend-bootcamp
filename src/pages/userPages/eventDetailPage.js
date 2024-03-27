//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

//-----------Components-----------//
import EventBookingPage from "./eventBookingPage";
import { BACKEND_URL } from "../../constant.js";

export default function EventDetailPage() {
  const [event, setEvent] = useState();
  const [eventId, setEventId] = useState();
  const [showRegistration, setShowRegistraton] = useState(null);
  const [isFree, setIsFree] = useState(null);

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

  const handleClickOpen = () => {
    setShowRegistraton(true);
  };

  const handleClose = () => {
    setShowRegistraton(false);
  };

  //add image
  const eventInfo = event ? (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{event.language.name}</p>
      <p>Start: {event.start}</p>
      <p>End: {event.end}</p>
      <p>${event.price}</p>
      <p>{event.admin.name}</p>
      <p>{event.venue.address}</p>
    </div>
  ) : null;

  return (
    <div>
      {eventInfo}
      <Button onClick={handleClickOpen}>Book</Button>
      {showRegistration && (
        <Dialog open={showRegistration} onClose={handleClose}>
          <EventBookingPage eventId={eventId} isFree={isFree} />
        </Dialog>
      )}
    </div>
  );
}

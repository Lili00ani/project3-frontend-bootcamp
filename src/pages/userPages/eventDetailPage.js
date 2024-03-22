//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

//-----------Components-----------//

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function EventDetailPage() {
  const [event, setEvent] = useState();
  const [eventId, setEventId] = useState();

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

  // Update eventID in state if needed to trigger data retrieval
  const params = useParams();
  if (eventId !== params.eventId) {
    setEventId(params.eventId);
  }

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
      <Button>Book</Button>
    </div>
  );
}

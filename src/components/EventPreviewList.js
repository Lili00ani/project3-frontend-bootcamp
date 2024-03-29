//-----------Libraries-----------//
import { useState, useEffect } from "react";
import axios from "axios";

//-----------Components-----------//
import EventPreview from "./EventPreview";
import { BACKEND_URL } from "../constant.js";

const EventPreviewList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const eventPreviews = events.map((event) => <EventPreview data={event} />);
  return <div>{eventPreviews}</div>;
};

export default EventPreviewList;

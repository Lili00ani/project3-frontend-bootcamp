//-----------Libraries-----------//
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

//-----------Components-----------//
import EventPreview from "./EventPreview";
import { BACKEND_URL } from "../constant.js";

const EventPreviewList = () => {
  const [events, setEvents] = useState([]);

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState();

  const fetchData = async () => {
    if (isAuthenticated) {
      let token = await getAccessTokenSilently();
      setAccessToken(token);
      try {
        const response = await axios.get(`${BACKEND_URL}/events`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const eventPreviews = events.map((event) => <EventPreview data={event} />);
  return <div>{eventPreviews}</div>;
};

export default EventPreviewList;

//-----------Libraries-----------//
import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Grid, ThemeProvider } from "@mui/material";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import EventPreview from "../../components/EventPreview.js";
import SearchBar from "../../components/searchBar";
import "./userPages.css";
import theme from "../../theme";

export default function SearchPage() {
  const { keyword } = useParams();
  const { state } = useLocation();
  const selectedCategories = state && state.categories ? state.categories : [];
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventPreviewRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEvents([]);
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/events/search/${keyword}`,
          {
            params: { categories: selectedCategories },
          }
        );

        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, selectedCategories]);

  const eventPreviews =
    events && events.length > 0 ? (
      <div>
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={(ref) => (eventPreviewRefs.current[index] = ref)}
          >
            <EventPreview data={event} />
          </div>
        ))}
      </div>
    ) : (
      <div className="div-no-event">No events found</div>
    );

  const markers =
    events.length > 0 &&
    events.map((event, index) => (
      <AdvancedMarker
        key={event.id}
        position={{
          lat: parseFloat(event.venue.lat),
          lng: parseFloat(event.venue.lng),
        }}
        title={event.title}
        onClick={() => handleMarkerClick(index)}
      >
        <Pin
          background={"#22ccff"}
          borderColor={"#1e89a1"}
          glyphColor={"#0f677a"}
        />
      </AdvancedMarker>
    ));

  const handleMarkerClick = (index) => {
    if (eventPreviewRefs.current[index]) {
      eventPreviewRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  console.log(markers);
  console.log(events);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <SearchBar />
      </div>

      <div
        style={{
          position: "fixed",
          top: "20vh",
          height: "70vh",
          width: "100%",
          overflowY: "scroll",
          marginBottom: "20vw",
        }}
      >
        {events.length > 0 && ( // Only render the map if events are loaded
          <APIProvider apiKey="{process.env.GOOGLE_MAPS_API_KEY}">
            <Map
              mapId={"searchedevents"}
              style={{ width: "100vw", height: "30vh" }}
              defaultCenter={{
                lat: 1.3521,
                lng: 103.8198,
              }}
              defaultZoom={10}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              {markers}
            </Map>
          </APIProvider>
        )}

        {eventPreviews}
      </div>
    </ThemeProvider>
  );
}

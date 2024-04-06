//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import {
  Card,
  Button,
  Switch,
  Backdrop,
  CircularProgress,
} from "@mui/material";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import EventPreview from "../../components/EventPreview.js";
import SearchBar from "../../components/searchBar";
import "./userPages.css";

export default function SearchPage() {
  const { keyword } = useParams();
  const { state } = useLocation();
  const selectedCategories = state && state.categories ? state.categories : [];
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
        {events.map((event) => (
          <EventPreview key={event.id} data={event} />
        ))}
      </div>
    ) : (
      <div className="div-no-event">No events found</div>
    );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div style={{ paddingBottom: "56px" }}>
          <SearchBar />
          <Backdrop open={loading} style={{ zIndex: 9999 }}>
            {" "}
            {/* Conditionally render Backdrop based on loading state */}
            <h3>Searching for events...</h3>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div
            style={{
              position: "fixed",
              top: "13vh",
              height: "85vh",
              width: "100%",
              overflowY: "scroll",
            }}
          >
            {eventPreviews}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

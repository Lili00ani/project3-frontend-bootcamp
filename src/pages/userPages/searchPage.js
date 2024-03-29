//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/events/search/${keyword}`,
          {
            params: { categories: selectedCategories },
          }
        );

        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [keyword]);

  console.log(events);

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
    <div>
      <SearchBar />
      {eventPreviews}
    </div>
  );
}

//-----------Libraries-----------//
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardMedia, Typography } from "@mui/material";

//-----------Components-----------//
import AdminEventPreview from "./AdminEventPreview";
import { BACKEND_URL } from "../constant.js";

const AdminEventPreviewList = ({ adminId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/events/admin`, {
          adminId: adminId,
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (events.length === 0) {
    return (
      <Box
        sx={{
          height: "70vh",
          paddingTop: "10vh",
        }}
      >
        <CardMedia
          sx={{
            height: "40vh",
            borderRadius: 3,
            objectFit: "contain",
            objectPosition: "center",
          }}
          image={`${process.env.PUBLIC_URL}/blank/blank.png`}
          title="emptystate"
        ></CardMedia>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            paddingTop: "8px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          You don't have any events.
        </Typography>
      </Box>
    );
  }

  const eventPreviews = events.map((event) => (
    <AdminEventPreview key={event.id} data={event} />
  ));
  return <>{eventPreviews}</>;
};

export default AdminEventPreviewList;

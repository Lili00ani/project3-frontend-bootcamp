//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import Typography from "@mui/material/Typography";

//-----------Components-----------//
import EventPreviewList from "../../components/EventPreviewList";
import SearchBar from "../../components/searchBar";

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <SearchBar />

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
        <EventPreviewList />
      </div>
    </ThemeProvider>
  );
}

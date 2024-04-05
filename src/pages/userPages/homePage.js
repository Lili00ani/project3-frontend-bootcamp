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
      <div>
        <div style={{ paddingBottom: "56px" }}>
          <SearchBar />

          <div
            style={{
              position: "fixed",
              top: "16vh",
              height: "85vh",
              width: "100%",
              overflowY: "scroll",
            }}
          >
            {" "}
            <EventPreviewList />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

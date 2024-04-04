//-----------Libraries-----------//
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

//-----------Components-----------//
import EventPreviewList from "../../components/EventPreviewList";
import SearchBar from "../../components/searchBar";

export default function HomePage() {
  return (
    <div>
      <div style={{ paddingBottom: "56px" }}>
        <SearchBar />
        <EventPreviewList />
      </div>
    </div>
  );
}

//-----------Libraries-----------//
import { useState, useEffect } from "react";

//-----------Components-----------//
import EventPreviewList from "../../components/EventPreviewList";

export default function HomePage() {
  return (
    <div>
      <EventPreviewList />
    </div>
  );
}

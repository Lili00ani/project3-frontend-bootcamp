import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Button from "@mui/material/Button";

import { BACKEND_URL } from "../../constant.js";

export default function FreeReturnPage() {
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const eventId = location.state.eventId;
  const user_id = location.state.user_id;
  const quantity_bought = location.state.quantity;

  console.log(eventId);
  console.log(quantity_bought);

  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/bookings/${eventId}`, {
        eventId: eventId,
        quantity_bought: quantity_bought,
        user_id: user_id,
      })
      .then((response) => {
        setStatus("complete");
      })
      .catch((error) => {
        console.error("Error inserting data", error);
      });
  }, []);

  return (
    <section id="success">
      <p>
        Hooray! You're in. Your event reservation is complete
        <Button component={Link} to="/home" variant="contained" color="primary">
          Return to Homepage
        </Button>
      </p>
    </section>
  );

  // return null;
}

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
  const quantity_bought = location.state.quantity;

  console.log(eventId);
  console.log(quantity_bought);

  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/bookings/${eventId}`, {
        eventId: eventId,
        quantity_bought: quantity_bought,
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
        We appreciate your business! A confirmation email will be sent to you.
        If you have any questions, please email{" "}
        <a href="mailto:orders@example.com">orders@example.com</a>.
        <Button component={Link} to="/" variant="contained" color="primary">
          Return to Homepage
        </Button>
      </p>
    </section>
  );

  // return null;
}
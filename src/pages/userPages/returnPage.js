import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Button from "@mui/material/Button";
import { BACKEND_URL } from "../../constant.js";

const stripePromise = loadStripe(
  "pk_test_51OyC8VEkRpzvMxvMLDTzSAtzYuI8Aj98G0UQ3IkjB4ERSxgMQKMb9RNDz0LUq30pttvyJo0TsbnZVVZDxdP8SnIy000n2nrCq9"
);

export default function ReturnPage() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get("session_id");
        const eventId = urlParams.get("eventId");
        const quantity = urlParams.get("quantity");
        const user = urlParams.get("user");

        const response = await axios.get(
          `http://localhost:3000/bookings/session-status?session_id=${sessionId}&eventId=${eventId}&quantity=${quantity}&user=${user}`
        );

        setStatus(response.data.status);
        console.log("Setstatus:", status);
        setCustomerEmail(response.data.customer_email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Status updated:", status);
  }, [status]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Display confirmation message or redirect based on status
  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <Button component={Link} to="/" variant="contained" color="primary">
          Return to Homepage
        </Button>
      </section>
    );
  } else if (status === "open") {
    return <Navigate to="/checkout" />;
  } else {
    return <p>Status: {status}</p>; // Handle other statuses if needed
  }
}

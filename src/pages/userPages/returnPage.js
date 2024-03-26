import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OyC8VEkRpzvMxvMLDTzSAtzYuI8Aj98G0UQ3IkjB4ERSxgMQKMb9RNDz0LUq30pttvyJo0TsbnZVVZDxdP8SnIy000n2nrCq9"
);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function ReturnPage() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    axios
      .get(
        `http://localhost:3000/bookings/session-status?session_id=${sessionId}`
      )
      .then((response) => {
        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  // return null;
}

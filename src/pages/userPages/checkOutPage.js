import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

//public key
const stripePromise = loadStripe(
  "pk_test_51OyC8VEkRpzvMxvMLDTzSAtzYuI8Aj98G0UQ3IkjB4ERSxgMQKMb9RNDz0LUq30pttvyJo0TsbnZVVZDxdP8SnIy000n2nrCq9"
);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutForm = () => {
  const location = useLocation();
  const eventId = location.state.eventId;
  const quantity_bought = location.state.quantity;

  console.log(eventId);
  console.log(quantity_bought);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session using axios
    return axios
      .post(`${BACKEND_URL}/bookings/create-checkout-session/${eventId}`, {
        quantity_bought: quantity_bought,
      })
      .then((response) => response.data.clientSecret)
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        throw error; // rethrow the error to handle it elsewhere if needed
      });
  }, []);

  const options = { fetchClientSecret };
  console.log(options);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;

import React, { useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../constant.js";
import { useAuth0 } from "@auth0/auth0-react";

//public key
const stripePromise = loadStripe(
  "pk_test_51OyC8VEkRpzvMxvMLDTzSAtzYuI8Aj98G0UQ3IkjB4ERSxgMQKMb9RNDz0LUq30pttvyJo0TsbnZVVZDxdP8SnIy000n2nrCq9"
);

const CheckoutForm = () => {
  const location = useLocation();
  const eventId = location.state.eventId;
  const quantity_bought = location.state.quantity;
  const user_id = location.state.user_id;
  const { user, loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    if (isAuthenticated) {
      fetchAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session using axios
    return axios
      .post(
        `${BACKEND_URL}/bookings/create-checkout-session/${eventId}`,
        {
          quantity_bought: quantity_bought,
          user_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => response.data.clientSecret)
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        throw error;
      });
  }, [accessToken, eventId, quantity_bought, user_id]);

  const options = { fetchClientSecret };
  console.log(options);

  console.log("User ID:", user_id);
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;

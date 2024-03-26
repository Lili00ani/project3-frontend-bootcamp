//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import axios from "axios";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";

export default function EventBookingPage({ eventId, isFree }) {
  const [quantity, setQuantity] = useState("");
  const [capacity, setCapacity] = useState("");

  //will add condition if price is free, don't need to go through stripe payment checkout
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/bookings/capacity/${eventId}`
        );

        setCapacity(response.data.availableCapacity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const arrayTickets = Array.from({ length: capacity }, (_, i) => i + 1);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="quantity-tickets">Tickets</InputLabel>
        <Select
          labelId=""
          id=""
          value={quantity}
          label="Quantity"
          onChange={handleQuantityChange}
        >
          {arrayTickets.map((quantity) => (
            <MenuItem key={quantity} value={quantity}>
              {quantity}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Quantity</FormHelperText>
      </FormControl>
      <Button
        component={Link}
        to={isFree ? "/free-return" : "/checkout"}
        state={{ eventId: eventId, quantity: quantity }}
        variant="contained"
        color="primary"
      >
        Checkout
      </Button>
    </div>
  );
}

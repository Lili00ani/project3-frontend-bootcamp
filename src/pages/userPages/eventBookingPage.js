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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function EventBookingPage({ eventId }) {
  const [quantity, setQuantity] = useState("");
  const [capacity, setCapacity] = useState("");

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
        to="/checkout"
        state={{ eventId: eventId, quantity: quantity }}
        variant="contained"
        color="primary"
      >
        Checkout
      </Button>
    </div>
  );
}

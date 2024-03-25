//-----------Libraries-----------//
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

//-----------Components-----------//

export default function EventBookingPage() {
  return (
    <div>
      <Link to={`/checkout`}>Checkout</Link>
    </div>
  );
}

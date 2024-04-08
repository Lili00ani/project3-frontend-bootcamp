import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';

export default function AdminCreateEvent() {
    const [ticketPrice, setTicketPrice] = useState('free');
    const [paidAmount, setPaidAmount] = useState('');

    const handlePriceChange = (event) => {
        setTicketPrice(event.target.value);
    };

    const handleAmountChange = (event) => {
        setPaidAmount(event.target.value);
    };
    return (
        <div style={{ height: "auto", display: "flex", marginTop: "3rem", marginBottom: "4rem", alignItems: "center" }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} xl={6}>
                    <Paper
                        style={{
                            padding: "2rem",
                            borderRadius: "4px",
                            backgroundColor: "#fff",
                            border: "none",
                            boxShadow: "none",
                        }}
                    >
                        {/* <div style={{ position: "absolute", top: 15, left: 20 }}>
              <Link
                to="/"
                style={{
                  padding: "0 2rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowBackIcon />
                Events
              </Link>
            </div> */}
                        <Typography
                            variant="h5"
                            component="h2"
                            style={{
                                marginBottom: ".5rem",
                                fontWeight: "bold",
                                textAlign: "start",
                            }}
                        >
                            Event
                        </Typography>
                        <form>

                            <TextField
                                label="Event Name"
                                variant="outlined"
                                type="text"
                                placeholder="Event Name"
                                fullWidth
                                style={{ marginBottom: ".5rem" }}

                            />{" "}
                            <small>Date</small>

                            <TextField
                                // label="date"
                                variant="outlined"
                                type="date"
                                fullWidth
                                style={{ marginBottom: ".5rem" }}

                            />{" "}
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                <TextField
                                    // label="Event Time From"
                                    variant="outlined"
                                    type="time"
                                    fullWidth
                                    style={{ marginBottom: ".5rem" }}

                                />
                                <TextField
                                    // label="Event Time To"

                                    variant="outlined"
                                    type="time"
                                    fullWidth
                                    style={{ marginBottom: ".5rem" }}

                                />
                            </div>
                            <small>Category</small>
                            <Select
                                label="Category"
                                variant="outlined"
                                fullWidth
                                // value={category}
                                // onChange={(e) => setCategory(e.target.value)}
                                style={{ marginBottom: ".5rem" }}

                            >
                                <MenuItem value={"Sports & Fitness"}>Sports & Fitness</MenuItem>
                                <MenuItem value={"Music & Arts"}>Music & Arts</MenuItem>
                                <MenuItem value={"Food & Drink"}>Food & Drink</MenuItem>
                                <MenuItem value={"Technology"}>Technology</MenuItem>

                            </Select>
                            <TextField
                                label="Location"
                                variant="outlined"
                                type="text"
                                placeholder="Location"
                                fullWidth
                                style={{ marginBottom: ".5rem" }}

                            />{" "}
                            <TextareaAutosize
                                label="Event Details"
                                placeholder="Event details"
                                minRows={3}
                                maxRows={6}
                                fullWidth


                            />
                            <div>
                                <RadioGroup value={ticketPrice} onChange={handlePriceChange}>
                                    <FormControlLabel value="free" control={<Radio />} label="Free" />
                                    <FormControlLabel value="paid" control={<Radio />} label="Paid" />
                                </RadioGroup>
                                {ticketPrice === 'paid' && (
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={paidAmount}
                                        onChange={handleAmountChange}
                                        fullWidth
                                        style={{ marginBottom: '.5rem' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MonetizationOnIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            </div>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                {/* Image upload button */}
                                <input
                                    accept="image/*"
                                    id="image-upload-button"
                                    type="file"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="image-upload-button">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                        style={{ marginBottom: '16px' }}
                                    >
                                        Upload Image
                                    </Button>
                                </label>

                                {/* Video upload button */}
                                <input
                                    accept="video/*"
                                    id="video-upload-button"
                                    type="file"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="video-upload-button">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload Video
                                    </Button>
                                </label>
                            </Box>
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>

                                <Button
                                    type="submit"
                                    style={{
                                        color: "#fff",
                                        backgroundColor: "#486453",
                                        borderRadius: "4px",
                                        padding: ".5rem",
                                        margin: ".5rem",

                                    }}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{
                                        color: "#fff",
                                        backgroundColor: "#486453",
                                        borderRadius: "4px",
                                        padding: ".5rem",
                                        margin: ".5rem",

                                    }}
                                >
                                    Create
                                </Button>

                            </div>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

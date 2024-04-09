//-----------Libraries-----------//
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import BookingPreview from "../../components/BookingPreview.js";
import theme from "../../theme";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function MyBookingPage() {
  const [value, setValue] = useState(0);
  const [current, setCurrent] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/bookings/current`, {
          params: { userId: "0a750c6d-758e-4113-806d-4061f49edd13" },
        });
        console.log(response.data);
        const output = response.data;
        setCurrent(output);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/bookings/past`, {
          params: { userId: "0a750c6d-758e-4113-806d-4061f49edd13" },
        });
        const output = response.data;
        setPast(output.event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentPreviews = current
    ? current.map((booking) => (
        <BookingPreview data={booking} key={booking.id} />
      ))
    : null;

  const pastPreviews = past
    ? past.map((booking) => <BookingPreview data={booking} key={booking.id} />)
    : null;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="Upcoming" />
          <Tab label="Past Events" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {currentPreviews}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {pastPreviews}
      </CustomTabPanel>
    </ThemeProvider>
  );
}

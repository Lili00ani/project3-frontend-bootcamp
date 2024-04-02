//-----------Libraries-----------//
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import axios from "axios";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import BookingPreview from "../../components/BookingPreview.js";

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
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
          params: { userId: 1 },
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${BACKEND_URL}/bookings/past`, {
  //         params: { userId: 1 },
  //       });
  //       const output = response.data;
  //       setPast(output.event);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentPreviews = current.map((booking) => (
    <BookingPreview data={booking} key={booking.id} />
  ));

  const pastPreviews = past.map((booking) => (
    <BookingPreview data={booking} key={booking.id} />
  ));

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      </Box>
    </div>
  );
}

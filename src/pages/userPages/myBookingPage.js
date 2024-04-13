//-----------Libraries-----------//
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

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
  const [userDb, setUserDb] = useState();
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState();

  const fetchData = async () => {
    try {
      if (user && user.email) {
        const response = await axios.post(`${BACKEND_URL}/users/`, {
          email: user.email,
        });
        const output = response.data;
        setUserDb(output);
      } else {
        console.log("User email is undefined.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkUser = async () => {
    if (isAuthenticated) {
      let token = await getAccessTokenSilently();
      setAccessToken(token);
      fetchData();
    } else {
      loginWithRedirect();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/bookings/current`, {
          params: {
            userId: userDb && userDb.length > 0 ? userDb[0].id : null,
          },
        });
        console.log(response.data);
        const output = response.data;
        setCurrent(output);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userDb]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/bookings/past`, {
          params: { userId: userDb && userDb.length > 0 ? userDb[0].id : null },
        });
        const output = response.data;
        setPast(output.event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userDb]);

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
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
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
            <div
              style={{
                position: "fixed",
                top: "10vh",
                height: "80vh",
                width: "100%",
                overflowY: "scroll",
                marginBottom: "20vw",
              }}
            >
              {currentPreviews}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div
              style={{
                position: "fixed",
                top: "10vh",
                height: "80vh",
                width: "100%",
                overflowY: "scroll",
                marginBottom: "20vw",
              }}
            >
              {pastPreviews}
            </div>
          </CustomTabPanel>
        </ThemeProvider>
      )}
    </>
  );
}

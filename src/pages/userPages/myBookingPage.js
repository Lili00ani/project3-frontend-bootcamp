//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Tabs,
  ThemeProvider,
  Tab,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import BookingPreview from "../../components/BookingPreview.js";
import theme from "../../theme";
import Redirect from "../../components/Redirect.js";

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
      {value === index && <Typography component="div">{children}</Typography>}
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

  const RedirectTab = () => {
    return (
      <div>
        <Redirect title="Booking" />
        <Box
          sx={{
            paddingLeft: "5vh",
            paddingRight: "5vh",
          }}
        >
          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            onClick={() => loginWithRedirect()}
          >
            Login
          </Button>
        </Box>
      </div>
    );
  };

  const checkUser = async () => {
    if (isAuthenticated) {
      let token = await getAccessTokenSilently();
      setAccessToken(token);
      fetchData();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (userDb && userDb.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/bookings/current`, {
            params: { userId: userDb[0].id },
          });
          const output = response.data;
          setCurrent(output);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [userDb]);

  useEffect(() => {
    if (userDb && userDb.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/bookings/past`, {
            params: { userId: userDb[0].id },
          });
          console.log(response.data);
          const output = response.data;
          setPast(output);
          console.log(past);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [userDb]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentPreviews =
    current.length > 0 ? (
      current.map((booking) => (
        <BookingPreview data={booking} key={booking.id} />
      ))
    ) : (
      <>
        <Card
          sx={{
            height: "70vh",
            paddingTop: "10vh",
          }}
        >
          <CardMedia
            sx={{
              height: "40vh",
              borderRadius: 3,
              objectFit: "contain",
              objectPosition: "center",
            }}
            image={`${process.env.PUBLIC_URL}/blank/blank.png`}
            title="emptystate"
          ></CardMedia>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              paddingTop: "8px",
              display: "flex",

              justifyContent: "center",
            }}
          >
            You don't have any upcoming events.
          </Typography>
        </Card>
      </>
    );

  const pastPreviews =
    past.length > 0 ? (
      past.map((booking) => <BookingPreview data={booking} key={booking.id} />)
    ) : (
      <>
        <Card
          sx={{
            height: "70vh",
            paddingTop: "10vh",
          }}
        >
          <CardMedia
            sx={{
              height: "40vh",
              borderRadius: 3,
              objectFit: "contain",
              objectPosition: "center",
            }}
            image={`${process.env.PUBLIC_URL}/blank/blank.png`}
            title="emptystate"
          ></CardMedia>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              paddingTop: "8px",
              display: "flex",

              justifyContent: "center",
            }}
          >
            You don't have any past events.
          </Typography>
        </Card>
      </>
    );

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <RedirectTab />
      </ThemeProvider>
    );
  }

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

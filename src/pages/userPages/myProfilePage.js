//-----------Libraries-----------//
import { useEffect, useState } from "react";
import {
  Avatar,
  ThemeProvider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  ContactSupport as ContactSupportIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//-----------Components-----------//
import { BACKEND_URL } from "../../constant.js";
import theme from "../../theme";

const MyProfilePage = () => {
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
  const [userDb, setUserDb] = useState();

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
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleContactUsClick = () => {
    navigate("/contactus");
  };

  const handleLoginOrLogout = () => {
    if (isAuthenticated) {
      logout();
    } else {
      loginWithRedirect();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 20,
            }}
          >
            {isAuthenticated && (
              <div style={{ padding: "1rem 3rem" }}>
                <Avatar src={user?.picture} alt="Profile Image" />
              </div>
            )}
            <Typography variant="body1" style={{ marginLeft: 10 }}>
              {user?.nickname}
            </Typography>
          </div>
        )}

        <List>
          <ListItem button onClick={handleContactUsClick}>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
          <ListItem button onClick={handleLoginOrLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={isAuthenticated ? "Sign Out" : "Sign In"} />
          </ListItem>
        </List>
      </div>
    </ThemeProvider>
  );
};

export default MyProfilePage;

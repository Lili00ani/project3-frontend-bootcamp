//-----------Libraries-----------//
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
  ContactSupport as ContactSupportIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

//-----------Components-----------//
import theme from "../../theme";

const MyProfilePage = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } =
    useAuth0();
  const navigate = useNavigate();

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

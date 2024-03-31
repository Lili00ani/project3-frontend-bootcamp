import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MessageIcon from "@mui/icons-material/Message";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../../slices/usersApiSlices";
import { logoutt } from "../../slices/AuthSlices";

// Refactor the component to start with an uppercase letter
const MyProfilePage = () => {
  const user = {
    name: "Glory Kendi",
    profileImg: "/logo192.png",
    unreadMessages: 3, // Number of unread messages
  };
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation(); //  destructuring
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);
  const handleLogout = async (e) => {
    try {
      const res = await logout();
      dispatch(logoutt());
      // navigate("/signin");
      // window.location.href = "/signin";
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            padding: "1rem 3rem",
          }}
        >
          <Avatar src={user.profileImg} alt="Profile Image" />
        </div>
        <Typography variant="body1" style={{ marginLeft: 10 }}>
          {userInfo?.name}
        </Typography>
      </div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>{" "}
        <ListItem button>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Message" />
          {user.unreadMessages > 0 && (
            <Typography variant="body2" color="primary">
              {user.unreadMessages}
            </Typography>
          )}
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Bookmark" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help & FAQs" />
        </ListItem>
        <ListItem
          button
          onClick={handleLogout}
          component={Link}
          //  to="/signin"
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Language" />
        </ListItem>
      </List>
    </div>
  );
};

export default MyProfilePage;

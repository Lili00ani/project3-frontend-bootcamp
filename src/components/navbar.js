//-----------Libraries-----------//
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";

//-----------Components-----------//

//-----------Styling-----------//
import "../App.css";

export default function NavBar() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 30px",
        }}
      >
        <Link to="/">
          <ExploreIcon />
        </Link>
        <Link to="/fav">
          <BookmarkIcon />
        </Link>
        <Link to="/mybooking">
          <EventIcon />
        </Link>
        <Link to="/profile">
          <PersonIcon />
        </Link>
      </Toolbar>
    </AppBar>
  );
}

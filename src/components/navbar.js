//-----------Libraries-----------//
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { ThemeProvider } from "@mui/material/styles";

//-----------Components-----------//
import theme from "../theme";

//-----------Styling-----------//
import "../App.css";

export default function NavBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 30px",
          }}
        >
          <Link to="/" sx={{ color: "primary" }}>
            <ExploreIcon />
          </Link>
          {/* <Link to="/fav">
            <BookmarkIcon />
          </Link> */}
          <Link to="/mybooking">
            <EventIcon />
          </Link>
          <Link to="/profile">
            <PersonIcon />
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

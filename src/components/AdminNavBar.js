//-----------Libraries-----------//
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { ThemeProvider, styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//-----------Components-----------//
import theme from "../theme";

//-----------Styling-----------//
import "../App.css";

export default function AdminNavBar() {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 30px",
          }}
        >
          <Link to="/admin/home" sx={{ color: "primary" }}>
            <ExploreIcon />
          </Link>

          <Link to="/admin/create">
            <AddCircleOutlineIcon />
          </Link>
          <Link to="/admin/profile">
            <PersonIcon />
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

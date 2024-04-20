//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Box,
  Drawer,
  Button,
  Chip,
  Stack,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import SearchIcon from "@mui/icons-material/Search";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

//-----------Components-----------//
import "./searchBar.css";
import { BACKEND_URL } from "../constant.js";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("all");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/categories`);
        const initialCheckedCategories = {};
        response.data.forEach((category) => {
          initialCheckedCategories[category.id] = false;
        });
        setCheckedCategories(initialCheckedCategories);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSubmit = async () => {
    try {
      const selectedCategories = Object.keys(checkedCategories).filter(
        (categoryId) => checkedCategories[categoryId]
      );

      navigate(`/search/${keyword}`, {
        state: { categories: selectedCategories },
      });
    } catch (error) {
      console.error("Error searching", error);
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setCheckedCategories((prevCheckedCategories) => ({
      ...prevCheckedCategories,
      [categoryId]: !prevCheckedCategories[categoryId],
    }));
  };

  const chips = categories.map((category) => (
    <Chip
      key={category.id}
      label={category.name}
      clickable
      color={checkedCategories[category.id] ? "secondary" : "default"}
      onClick={() => handleCategoryToggle(category.id)}
    />
  ));

  const handleResetCategory = () => {
    const resetCategories = {};
    Object.keys(checkedCategories).forEach((categoryId) => {
      resetCategories[categoryId] = false;
    });
    setCheckedCategories(resetCategories);
  };

  const categoriesList = categories.map((category) => (
    <FormControlLabel
      key={category.id}
      control={
        <Checkbox
          checked={checkedCategories[category.id]}
          onChange={() => handleCategoryToggle(category.id)}
        />
      }
      label={category.name}
      onClick={(e) => e.stopPropagation()}
    />
  ));

  const FilterList = (
    <Box
      sx={{ width: "90vw", margin: "0 5vw" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemText primary="Filter Options" />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleResetCategory();
            }}
          >
            X
          </Button>
        </ListItem>
        <Divider />
        <ListItem>
          <FormGroup>{categoriesList}</FormGroup>
        </ListItem>
        <Divider />
      </List>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );

  return (
    <div
      className="Search-bar"
      style={{
        width: "90%",
        position: "fixed",
        flexDirection: "column",
        zIndex: 999,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Input
          fullWidth
          onChange={(e) => setKeyword(e.target.value)}
          defaultValue="all"
        />
        <SearchIcon onClick={handleSubmit} />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            marginTop: "10px",
            overflowX: "auto",
            scrollbarWidth: "none",
            maxHeight: "200px",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Chip
              onClick={toggleDrawer(true)}
              icon={<TuneIcon />}
              label="Filter"
            />
            {chips}
          </Stack>
        </div>
      </Box>

      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        {FilterList}
      </Drawer>
    </div>
  );
}

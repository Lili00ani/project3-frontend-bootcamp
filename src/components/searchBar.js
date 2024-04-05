//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Input, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Chip, Stack } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TuneIcon from "@mui/icons-material/Tune";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import Container from "@mui/material/Container";

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
      // Handle response from backend
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
      control={
        <Checkbox
          checked={checkedCategories[category.id]}
          onChange={() => handleCategoryToggle(category.id)}
        />
      }
      label={category.name}
      onClick={(e) => e.stopPropagation()} // Prevent closing the drawer when clicking on the checkbox
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
        <ListItem>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Free"
              onClick={(e) => e.stopPropagation()}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Paid"
              onClick={(e) => e.stopPropagation()}
            />
          </FormGroup>
        </ListItem>
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
        position: "fixed",
        top: 0,
        width: "90%",
        flexDirection: "column",
        marginRight: "5vw",
        paddingRight: "5vw",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center", // Center content horizontally
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
            overflowX: "auto", // Enable vertical scrolling
            maxHeight: "200px", // Adjust the max height as needed
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

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
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TuneIcon from "@mui/icons-material/Tune";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

//-----------Components-----------//
import "./searchBar.css";
import { BACKEND_URL } from "../constant.js";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
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
          initialCheckedCategories[category.id] = true;
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
    <div className="Search-bar">
      <Input
        fullWidth
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchIcon onClick={handleSubmit} />
      <Button onClick={toggleDrawer(true)}>
        <TuneIcon />
      </Button>
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        {FilterList}
      </Drawer>
    </div>
  );
}

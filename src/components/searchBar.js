//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Input, IconButton } from "@mui/material";

//-----------Components-----------//
import "./searchBar.css";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navi = useNavigate();

  return (
    <div className="Search-bar">
      <Input
        fullWidth
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchIcon
        onClick={() => {
          setKeyword("");
          navi(`/search/${keyword}`);
        }}
      />
    </div>
  );
}

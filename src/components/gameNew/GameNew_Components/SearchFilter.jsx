import { InputBase, Paper } from "@mui/material";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

function SearchFilter() {
  return (
    <Paper
      className="search-wrapper"
      component="form"
      sx={{
        width: "300px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Options" />
      <IconButton type="button">
        <SearchIcon sx={{ color: "#ACACAC", height: "17px" }} />
      </IconButton>
    </Paper>
  );
}

export default SearchFilter;

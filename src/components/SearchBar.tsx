import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
    return (
        <div className="container">
            <Paper className="paperStyle" component="form" sx={{ p: "2px 4px" }}>
                {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search in the forum"
                    inputProps={{ "aria-label": "search in the forum" }}
                />
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
};

export default SearchBar;

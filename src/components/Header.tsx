// import SearchBar from "./SearchBar";
import { UserData } from "../types/UserData";
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, MenuItem, Menu, InputBase, Popover, createTheme } from "@mui/material";
import { Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { blue } from "@mui/material/colors";
// import theme from "../App"
type HeaderProps = {
    handleClickOpen: () => void;
    userData: UserData | null;
};

const Header: React.FC<HeaderProps> = ({ handleClickOpen, userData }) => {
    const navigate = useNavigate(); // Define useNavigate here

    // Define a function to handle navigation to home
    const handleNavigateHome = () => {
        navigate("/");
    };

    const [anchorElSearch, setAnchorElSearch] = useState<null | HTMLElement>(null);
    const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(null);

    const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSearch(event.currentTarget);
    };

    const handleSearchClose = () => {
        setAnchorElSearch(null);
    };

    const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCategory(event.currentTarget);
    };

    const handleCategoryClose = () => {
        setAnchorElCategory(null);
    };

    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Button color="inherit" onClick={handleNavigateHome}>
                    <Typography variant="h6">Web Forum</Typography>
                </Button>
                <div>
                    <IconButton color="inherit" onClick={handleSearchClick}>
                        <SearchIcon />
                    </IconButton>
                    <Popover
                        id="search-menu"
                        open={Boolean(anchorElSearch)}
                        anchorEl={anchorElSearch}
                        onClose={handleSearchClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <div style={{ padding: '5px', width: '50vh' }}>
                            <InputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                style={{ border: `1px solid ${blue[500]}`, width: "100%", padding: "5px", borderRadius: "10px" }}
                            />
                        </div>
                    </Popover>

                    <IconButton color="inherit" onClick={handleCategoryClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="category-menu"
                        anchorEl={anchorElCategory}
                        keepMounted
                        open={Boolean(anchorElCategory)}
                        onClose={handleCategoryClose}
                    >
                        {/* Populate with your categories */}
                        <MenuItem onClick={handleCategoryClose}>Category 1</MenuItem>
                        <MenuItem onClick={handleCategoryClose}>Category 2</MenuItem>
                        {/* ... other categories ... */}
                    </Menu>
                    {!userData ? (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    ) : (
                        <Button color="inherit">{userData.userName}</Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

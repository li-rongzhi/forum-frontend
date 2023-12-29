import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, InputBase, Avatar, Menu, MenuItem } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { styled, alpha } from '@mui/material/styles';
import { isLoggedIn } from "../utils/CheckLoginState";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
}));

const Header: React.FC = () => {
    const navigate = useNavigate(); // Define useNavigate here

    const [userName, setUserName] = useState('Guest');

    // Define a function to handle navigation to home
    const handleNavigateHome = () => {
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/login");
    }

    const [searchTerm, setSearchTerm] = useState<string>('');
    // Function to handle the change in the input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle the submission of the search
    const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();  // Prevent the default form submit action
        // Implement what should happen when search is submitted
        console.log('Search submitted for: ', searchTerm);
        // You might want to call an API or update some state with the searchTerm here
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewAccount = () => {
        // Logic to view account details
        handleClose();
        navigate("/user");
    };

    const handleLogoutClick = () => {
        // Your existing handleLogout logic
        handleClose();
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        // Function to update userName from localStorage
        const updateUserName = () => {
            const userDataJSON = localStorage.getItem('userData');
            if (userDataJSON) {
                const userData = JSON.parse(userDataJSON);
                setUserName(userData.userName || 'Guest');
            } else {
                setUserName('Guest'); // Reset to 'Guest' if no userData
            }
        };

        // Call updateUserName to set the initial userName
        updateUserName();

        // Optional: Set up an event listener for localStorage changes
        // This can be useful if you expect userData to change while the header is mounted
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'userData') {
                updateUserName();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Button color="inherit" onClick={handleNavigateHome}>
                    <Typography variant="h6">Web Forum</Typography>
                </Button>
                <div style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                    <Search onSubmit={handleSubmit}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </Search>
                    {!isLoggedIn() ? (
                        <Button color="inherit" onClick={handleLogin}>
                            Login
                        </Button>
                    ) : (
                        <div>
                            <Avatar
                                onClick={handleAvatarClick}
                                style={{ cursor: 'pointer' }}
                                src="URL_TO_USER_IMAGE" // Replace with your image path
                                alt={userName}
                            />
                            <Menu
                                id="account-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleViewAccount}>View Account</MenuItem>
                                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

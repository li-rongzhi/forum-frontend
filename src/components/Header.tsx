import { UserData } from "../types/UserData";
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, InputBase } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { styled, alpha } from '@mui/material/styles';

type HeaderProps = {
    handleClickOpen: () => void;
    userData: UserData | null;
};

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

const Header: React.FC<HeaderProps> = ({ handleClickOpen, userData }) => {
    const navigate = useNavigate(); // Define useNavigate here

    // Define a function to handle navigation to home
    const handleNavigateHome = () => {
        navigate("/");
    };

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
    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Button color="inherit" onClick={handleNavigateHome}>
                    <Typography variant="h6">Web Forum</Typography>
                </Button>
                <div style={{display: "flex"}}>
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

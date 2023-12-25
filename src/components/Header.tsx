import SearchBar from "./SearchBar";
import { UserData } from "../types/UserData";
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.css";

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
    return (
        <AppBar position="static">
            <Toolbar className="toolbar">
                <Button color="inherit" onClick={handleNavigateHome} style={{ textTransform: "none" }}>
                    <Typography variant="h6">Web Forum</Typography>
                </Button>
                <SearchBar />
                {!userData ? (
                    <Button color="inherit" onClick={handleClickOpen}>
                        Login
                    </Button>
                ) : (
                    <Button color="inherit">{userData.userName}</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;

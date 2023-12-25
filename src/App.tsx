import Header from "./components/Header";
import Home from "./pages/Home";
import CreateThreadPage from "./pages/CreateThread";
import Popup from "./components/Popup";
import { LoginResponse } from "./types/LoginResponse";
import { UserData } from "./types/UserData";
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    // const [ifLogin, setIfLogin] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(token);
    };

    const handleLoginSuccess = (response: LoginResponse) => {
        const token = response.token;
        setToken(token);
        setUserData(response.user);
    };
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Header handleClickOpen={handleClickOpen} userData={userData} />
                    {/* <LoginPopup open={open} handleClose={handleClose} onLoginSuccess={handleLoginSuccess} /> */}
                    <Popup open={open} handleClose={handleClose} onLoginSuccess={handleLoginSuccess} />
                    {/* <SignupPopup open={signupOpen} handleClose={() => setSignupOpen(false)} onSignupSuccess={handleSignupSuccess} /> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/edit" element={<CreateThreadPage token={token} />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;

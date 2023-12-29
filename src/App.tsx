import Home from "./pages/HomePage";
import CreateThreadPage from "./pages/CreateThreadPage";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Header from "./components/Header";
import AccountPage from "./pages/AccountInfoPage";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import Footer from "./components/Footer";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/edit" element={<CreateThreadPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/user" element={<AccountPage />} />
                        <Route path="/thread/:threadId" element={<ThreadDetailPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;

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
import { Box, CssBaseline } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Take at least full viewport height
          }}
        >
          <Header />
          <Box component="main" sx={{ flex: 1 }}> {/* This Box wraps the Routes and allows the content to grow */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<CreateThreadPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user" element={<AccountPage />} />
              <Route path="/thread/:threadId" element={<ThreadDetailPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
    );
};

export default App;

import { LoginResponse } from "../types/LoginResponse";
import React, { useState } from "react";
import { Button, DialogTitle, DialogContentText, DialogActions, TextField, DialogContent } from "@mui/material";

type LoginPopupProps = {
    // open: boolean;
    handleClose: () => void;
    onLoginSuccess: (response: LoginResponse) => void;
    setIsLogin: (val: boolean) => void;
};

// const LoginPopup: React.FC<LoginPopupProps> = ({ open, handleClose, onLoginSuccess }) => {
const LoginPopup: React.FC<LoginPopupProps> = ({ handleClose, onLoginSuccess, setIsLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_name: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                // If the response status code is not in the 200 range (e.g., 401, 403, 500, etc.)
                const errorData = await response.json(); // Assuming the server responds with JSON-formatted error message
                throw new Error(errorData.error || "An unknown error occurred");
            }

            const data: LoginResponse = await response.json(); // Assume the server responds with the expected structure
            onLoginSuccess(data);
            handleClose();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };
    return (
        <>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>To participate in the forum, please enter your login details.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="User Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div style={{ marginTop: "20px" }}>
                    New to the forum?
                    <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setIsLogin(false)}>
                        Sign up
                    </span>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </>
    );
};
export default LoginPopup;

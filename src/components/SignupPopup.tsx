// import { LoginResponse } from "../types/LoginResponse";
import React, { useState } from "react";
import { Button, DialogTitle, DialogContentText, DialogActions, TextField, DialogContent } from "@mui/material";

type SignupPopupProps = {
    // open: boolean;
    handleClose: () => void;
    setIsLogin: (val: boolean) => void;
};

// const LoginPopup: React.FC<LoginPopupProps> = ({ open, handleClose, onLoginSuccess }) => {
const SignupPopup: React.FC<SignupPopupProps> = ({ handleClose, setIsLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
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
            <DialogTitle>Signup</DialogTitle>
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
                    Already have an account?
                    <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setIsLogin(true)}>
                        Log in
                    </span>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLogin}>Signup</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </>
    );
};
export default SignupPopup;

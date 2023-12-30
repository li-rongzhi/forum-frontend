import React, { useState } from "react";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";
import { LoginResponse } from "../types/LoginResponse";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };
    const navigate = useNavigate();
    const handleLogin: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
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
            console.log("temp");
            if (!response.ok) {
                // If the response status code is not in the 200 range (e.g., 401, 403, 500, etc.)
                const errorData = await response.json(); // Assuming the server responds with JSON-formatted error message
                throw new Error(errorData.error || "An unknown error occurred");
            }
            const data: LoginResponse = await response.json(); // Assume the server responds with the expected structure
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData',JSON.stringify(data.user));
            console.log("login");
            navigate("/");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              value={username}
              onChange={handleUsernameChange}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
};

export default LoginPage;

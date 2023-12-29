import React, { useEffect, useState } from "react";
import { TextField, Button, DialogActions, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { isLoggedIn } from "../utils/CheckLoginState";
import { useNavigate } from "react-router-dom";

const CreateThreadPage: React.FC = () => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [newPost, setNewPost] = useState<string>("");

    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewTitle(event.target.value);
    };

    const handlePostChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewPost(event.target.value);
    };

    const submitThread = async () => {
        if (newPost.trim() !== "") {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/threads`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    body: JSON.stringify({
                        title: newTitle, // Add a state or input for the title if needed
                        content: newPost,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                setNewTitle("");
                setNewPost(""); // Clear the input field
            } catch (error) {
                console.error("Error submitting thread:", error);
            }
        }
    };

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    // Assuming you have a function to check login status
    useEffect(() => {
        if (!isLoggedIn()) {
            setOpen(true); // Open the dialog if not logged in
        }
    }, []); // Empty array ensures this effect runs once on mount

    const handleClose = () => {
        setOpen(false);
        navigate('/login'); // Redirect to login page when the dialog is closed
    };
    
    if (!isLoggedIn()) {
        // Dialog to inform the user they need to be logged in
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>You need to log in</DialogTitle>
                <DialogContent>
                    To create a new thread, please log in first.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Go to Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
    return (
        <>
            <div style={{ margin: 20 }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={newTitle}
                    onChange={handleTitleChange}
                    style={{ marginBottom: 10 }} // Add some space between the fields
                />
                <TextField
                    label="What's on your mind?"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={newPost}
                    onChange={handlePostChange}
                />
                <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={submitThread}>
                    Post
                </Button>
            </div>
        </>
    );
};

export default CreateThreadPage;

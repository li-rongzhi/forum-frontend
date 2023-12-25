import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

type CreateThreadPageProps = {
    token: string; // Accept the token as a prop
};

const CreateThreadPage: React.FC<CreateThreadPageProps> = ({ token }) => {
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

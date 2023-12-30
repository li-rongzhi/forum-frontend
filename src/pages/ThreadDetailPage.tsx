import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Thread } from '../types/Thread';
import ToLoginPopup from '../components/ToLoginPopup';
import CalculateTimeStamp from '../utils/CalculateTimestamp';
import { isLoggedIn } from '../utils/CheckLoginState';

const ThreadDetailPage = () => {
    const { threadId } = useParams(); // Get threadId from URL
    const [ thread, setThread ] = useState<Thread | null>(null);
    const [newComment, setNewComment] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [commentAdded, setCommentAdded] = useState(false);

    // Fetch thread details when component mounts or threadId changes
    useEffect(() => {
        const fetchThread = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/threads/${threadId}`);
                const data = await response.json();
                const commentResponse = await fetch(`${process.env.REACT_APP_API_URL}/threads/${threadId}/comments`);
                data.comments = await commentResponse.json(); // Attach the comments directly to the thread object
                setThread(data);
            } catch (error) {
                console.error('Failed to load thread:', error);
            }
        };

        fetchThread();
    }, [threadId, commentAdded]);

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const submitComment = async () => {
        if (!isLoggedIn()) {
            setOpen(true);
            return
        }
        if (newComment.trim() !== "") {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    body: JSON.stringify({
                        content: newComment,
                        thread_id: threadId
                    }),
                });
                console.log(response);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                setNewComment("");
                setCommentAdded(!commentAdded);
            } catch (error) {
                console.error("Error submitting thread:", error);
            }
        }
    };
    // Placeholder for loading state
    if (!thread) {
        return <p>Loading...</p>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {thread.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {thread.content}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                {CalculateTimeStamp(thread.created_at)}
            </Typography>

            <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Add a Comment:
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Your comment"
                    multiline
                    rows={3}
                    value={newComment}
                    onChange={handleCommentChange}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" onClick={submitComment}>
                    Post Comment
                </Button>
            </Box>
            <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Comments:
                </Typography>
                {thread.comments.length > 0 ? (
                    thread.comments.map((comment, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <Typography variant="body2">
                                {comment.content}
                            </Typography>
                            <Typography variant="caption">
                                {CalculateTimeStamp(comment.created_at)}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography>No comments yet.</Typography>
                )}
            </Box>
            <ToLoginPopup initial={open} />
        </Box>
    );
};

export default ThreadDetailPage;

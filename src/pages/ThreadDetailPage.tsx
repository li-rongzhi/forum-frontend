import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Thread } from '../types/Thread';

const ThreadDetailPage = () => {
    const { threadId } = useParams(); // Get threadId from URL
    const [ thread, setThread ] = useState<Thread | null>(null);

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
    }, [threadId]);

    // Placeholder for loading state
    if (!thread) {
        return <p>Loading...</p>;
    }

    // Function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {thread.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {thread.content}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                Created at: {formatDate(thread.created_at)}
            </Typography>

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
                                Posted at: {formatDate(comment.created_at)}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography>No comments yet.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ThreadDetailPage;

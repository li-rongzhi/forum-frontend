// import SearchBar from "../components/SearchBar";
import CreateThreadBtn from "../components/CreateThreadBtn";
import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

// Define the types for your thread and comment data
type Comment = {
    comment_id: number;
    thread_id: number;
    user_id: number;
    content: string;
    created_at: string;
};

type Thread = {
    thread_id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    comments: Comment[];
};

const Home: React.FC = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    // Load threads from the backend on component mount
    useEffect(() => {
        const fetchThreadsAndComments = async () => {
            try {
                console.log(`${process.env.REACT_APP_API_URL}/threads`)
                const response = await fetch(`${process.env.REACT_APP_API_URL}/threads`);
                const threads: Thread[] = await response.json();
                for (const thread of threads) {
                    const commentResponse = await fetch(`${process.env.REACT_APP_API_URL}/threads/${thread.thread_id}/comments`);
                    thread.comments = await commentResponse.json(); // Attach the comments directly to the thread object
                }
                threads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setThreads(threads); // Set the threads with comments in state
            } catch (error) {
                console.error("Error fetching threads and comments:", error);
            }
        };
        fetchThreadsAndComments();
    }, []);

    return (
        <>
            {/* <SearchBar /> */}
            <CreateThreadBtn to="/edit" label="Create new thread" />
            <List style={{ margin: 20 }}>
                {threads.map((thread) => (
                    <React.Fragment key={thread.thread_id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText primary={thread.title} secondary={thread.content} />
                            <Typography variant="body2" color="textSecondary">
                                Posted by User {thread.user_id} on {new Date(thread.created_at).toLocaleString()}
                            </Typography>
                        </ListItem>
                        {/* Comments for the thread */}
                        {thread.comments && (
                            <List component="div" disablePadding>
                                {thread.comments.map((comment) => (
                                    <ListItem key={comment.comment_id} alignItems="flex-start">
                                        <ListItemText secondary={`${comment.content} (User ${comment.user_id})`} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>
        </>
    );
};

export default Home;

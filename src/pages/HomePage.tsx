// import SearchBar from "../components/SearchBar";
import CreateThreadBtn from "../components/CreateThreadBtn";
import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { Thread } from "../types/Thread";
import ThreadList from "../components/ThreadList";
import FilterSortControls from "../components/FilterSortControls";

// Define the types for your thread and comment data

const Home: React.FC = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [filteredThreads, setFilteredThreads] = useState<Thread[]>(threads);

    // Categories for your forum - this could be dynamic if fetched from an API
    const all_categories = ['General', 'Support', 'Feedback', 'Announcements'];

    // Handler for category changes
    const handleCategoryChange = (category: string) => {
    //     if (category) {
    //     // Apply category filter
    //     setFilteredThreads(threads.filter(thread => thread.category === category));
    // } else {
    //     // If no category is selected, reset to show all threads
    //     setFilteredThreads(threads);
    // }
        setFilteredThreads(threads);
    };

    // Handler for sort changes
    const handleSortChange = (sortKey: string) => {
        let sortedThreads = [...threads];

        if (sortKey === 'time') {
            sortedThreads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else if (sortKey === 'popularity') {
            // Sort by some popularity metric - placeholder for your logic
            sortedThreads.sort((a, b) => /* your popularity comparison logic here */ 0);
        }
        // Apply more sort conditions as needed
        setFilteredThreads(sortedThreads);
    };
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
            <Container maxWidth="lg" style={{paddingTop: "8px", width: "85%"}}>
                <Grid container spacing={3} alignItems="center" style={{ height: '100%' }}>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <FilterSortControls
                            categories={all_categories}
                            onCategoryChange={handleCategoryChange}
                            onSortChange={handleSortChange}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CreateThreadBtn />
                    </Grid>
                </Grid>
            </Container>
            <ThreadList threads={threads} />
        </>
    );
};

export default Home;

import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Thread } from "../types/Thread";
import { Box, ListItemButton } from '@mui/material';
import CalculateTimeStamp from '../utils/CalculateTimestamp';
import { useNavigate } from 'react-router-dom';

type ThreadListProps = {
    threads: Thread[];
}

const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
};

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
    const navigate = useNavigate();
    const handleThreadClick = (threadId: number) => {
        // Navigate to the thread detail page
        navigate(`/thread/${threadId}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <List sx={{
                width: '80%',
                bgcolor: 'background.paper',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '4px',
                margin: 'auto',
                overflow: 'hidden',
            }}>
                {threads.map((thread, index) => (
                    <React.Fragment key={thread.title}>
                        <ListItemButton onClick={() => handleThreadClick(thread.thread_id)}>
                            <ListItem
                                alignItems='flex-start'
                                secondaryAction={
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        color="text.secondary"
                                        sx={{ textAlign: 'right' }}
                                    >
                                        {CalculateTimeStamp(thread.created_at)}
                                    </Typography>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar alt='User Avatar' /> {/* Add src={thread.userAvatar} if available */}
                                </ListItemAvatar>
                                <ListItemText
                                    primary={thread.title}
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {truncateText(thread.content, 100)}
                                            </Typography>
                                            {/* Display comments if any */}
                                            {thread.comments && thread.comments.map((comment, commentIndex) => (
                                                <Typography
                                                    key={commentIndex}
                                                    sx={{ display: 'block' }}
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    {truncateText(comment.content, 50)}
                                                </Typography>
                                            ))}
                                        </>
                                    }
                                />
                            </ListItem>
                        </ListItemButton>
                        {/* Only add a divider if it's not the last item */}
                        {index !== threads.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
  );
}

export default ThreadList;
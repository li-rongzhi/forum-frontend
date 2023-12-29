import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Thread } from "../types/Thread";
import { Box } from '@mui/material';
import CalculateTimeStamp from '../utils/CalculateTimestamp';

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
          margin: 'auto', // for centering in the flex container
          overflow: 'hidden', // to apply border-radius
        }}>
        {threads.map((thread, index) => (
            <React.Fragment key={thread.title}>
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
                    }>
                    <ListItemAvatar>
                        <Avatar alt='User Avatar' /> {/* 'Test' placeholder removed to avoid placeholder text */}
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
                                    key={commentIndex} // A unique key for each comment
                                    sx={{ display: 'block' }} // Each comment on a new line
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
                {/* Only add a divider if it's not the last item */}
                {index !== threads.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
        ))}
    </List>
    </Box>
  );
}

export default ThreadList;
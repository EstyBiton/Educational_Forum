import React from 'react';
import { ListItem, ListItemText, Typography, IconButton, Divider } from '@mui/material';
import { Mail, ThumbDown, ThumbUp } from '@mui/icons-material';
import { PostType } from '../../data/types/post.types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    listItem: {
        marginBottom: '20px',
        borderRadius: '8px',
        padding: '20px',
        position: 'relative',
    },
    content: {
        fontSize: '1rem',
        color: '#555',
        textAlign: 'right',
    },
    blackIcon: {
        color: 'black',
    },
    likeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        '&.liked': {
            color: 'green',
        },
    },
    counselorPost: {
        backgroundColor: 'lightgreen',
    },
    userPost: {
        backgroundColor: 'lightblue',
    },
    topicOwnerPost: {
        backgroundColor: '#FFCDD2',
    },
    postLabel: {
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    likedIcon: {
        color: 'green',
    },
});

interface PostItemProps {
    post: PostType;
    topicUserId: number;
    usersMap: { [key: string]: string };
    likedPosts: { [key: number]: { liked: boolean; disliked: boolean } };
    handleLikePost: (postId: number) => void;
    handleReportClick: (postId: number) => void;
    handleContactClick: (counselorId: number) => void;
    formatDate: (date: Date) => string;
}

const PostItem: React.FC<PostItemProps> = ({
    post,
    topicUserId,
    usersMap,
    likedPosts,
    handleLikePost,
    handleReportClick,
    handleContactClick,
    formatDate,
}) => {
    const classes = useStyles();

    return (
        <>
            <ListItem
                className={`${classes.listItem} ${
                    post.userId === topicUserId ? classes.topicOwnerPost : ''
                } ${post.counselorId ? classes.counselorPost : classes.userPost}`}
            >
                <ListItemText
                    primary={
                        <Typography variant="h6" className={classes.content}>
                            {post.userId === topicUserId ? (
                                <Typography className={classes.postLabel}>תגובה זו פורסמה על ידי בעל/ת האשכול</Typography>
                            ) : post.counselorId ? (
                                <Typography className={classes.postLabel}>תגובה זו פורסמה על ידי יועצ/ת</Typography>
                            ) : (
                                <Typography className={classes.postLabel}>תגובה זו פורסמה על ידי משתמש/ת מהקהילה</Typography>
                            )}
                            {post.content}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="caption" color="textSecondary" className={classes.content}>
                            {`פורסם ע"י ${
                                post.counselorId
                                    ? usersMap[`counselor-${post.counselorId}`]
                                    : usersMap[`user-${post.userId}`] || 'משתמש לא ידוע'
                            } בתאריך ${formatDate(new Date(post.date))}`}
                        </Typography>
                    }
                />
                {post.counselorId && (
                    <IconButton aria-label="Email" onClick={() => post.counselorId && handleContactClick(post.counselorId)}>
                        <Mail className={classes.blackIcon} />
                    </IconButton>
                )}
                
                <IconButton
                    edge="end"
                    aria-label="like"
                    onClick={() => handleLikePost(post.id)}
                    className={`${classes.likeButton} ${likedPosts[post.id]?.liked ? 'liked' : ''}`}
                    disabled={likedPosts[post.id]?.liked || likedPosts[post.id]?.disliked}
                >
                    <ThumbUp className={`${likedPosts[post.id]?.liked ? classes.likedIcon : ''} ${classes.blackIcon}`} />
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '5px' }}>
                        {post.likes}
                    </Typography>
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="dislike"
                    style={{ color: likedPosts[post.id]?.disliked ? 'red' : 'inherit' }}
                    onClick={() => handleReportClick(post.id)}
                    disabled={likedPosts[post.id]?.liked || likedPosts[post.id]?.disliked}
                >
                    <ThumbDown />
                    <Typography variant="caption" component="span">לדיווח</Typography>
                </IconButton>
            </ListItem>
            <Divider />
        </>
    );
};

export default PostItem;

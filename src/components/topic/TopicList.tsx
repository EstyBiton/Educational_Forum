import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, List, Card, CardContent, CardActions, Box, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getAllTopics } from '../../data/services/topic.service';
import { getUserById } from '../../data/services/user.service';

const useStyles = makeStyles({
    root: {
        direction: 'rtl',
    },
    card: {
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardContent: {
        padding: '20px',
    },
    cardActions: {
        padding: '0 20px 20px 20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#0d47a1',
    },
    content: {
        marginTop: '10px',
        fontSize: '1rem',
        color: '#555',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        marginRight: '10px',
    },
    tags: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    tag: {
        marginLeft: '8px',
    },
});

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });
};

interface Topic {
    id: string;
    title: string;
    dateCreated: string;
    tags: string[];
    postIds: string[];
    posts: Post[];
    userId: string;
}

interface Post {
    id: string;
    content: string;
}

const TopicList: React.FC = () => {
    const classes = useStyles();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [users, setUsers] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicsData = await getAllTopics();
                // Sort topics by dateCreated in descending order
                const sortedTopics = topicsData.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
                setTopics(sortedTopics);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchTopics();
    }, []);

    useEffect(() => {
        const fetchUserNames = async () => {
            if (topics.length === 0) return;

            const uniqueUserIds = Array.from(new Set(topics.map(topic => topic.userId).filter(id => id)));

            try {
                const userPromises = uniqueUserIds.map(userId =>
                    getUserById(parseInt(userId))
                        .then(user => ({ [userId]: user.name }))
                        .catch(error => ({ [userId]: 'Unknown' }))
                );
                const userResults = await Promise.all(userPromises);
                const userMap = userResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setUsers(userMap);
            } catch (error) {
                console.error('Error fetching user names:', error);
            }
        };

        fetchUserNames();
    }, [topics]);

    const handleTopicClick = (topic: Topic) => {
        navigate(`/topic/${topic.id}`);
        window.scrollTo(0, 0); // Scroll to top on topic click
    };

    return (
        <Box className={classes.root}>
            <List>
                {topics.map((topic) => (
                    <Card key={topic.id} className={classes.card} onClick={() => handleTopicClick(topic)}>
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.title}>
                                {topic.title}
                            </Typography>
                            <Typography className={classes.content}>
                                {topic.posts.length > 0 ? topic.posts[0].content : ''}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Box className={classes.infoContainer}>
                                <Typography className={classes.infoItem}>
                                    <strong>בתאריך:</strong> {formatDate(topic.dateCreated).split(',')[0]}
                                </Typography>
                                <Typography className={classes.infoItem}>
                                    . <strong>בשעה:</strong> {formatDate(topic.dateCreated).split(',')[1]}
                                </Typography>
                                <Typography className={classes.infoItem}>
                                    . <strong>נשאל על ידי:</strong> {users[topic.userId] || 'Unknown'}
                                .</Typography>
                            </Box>
                            <Box className={classes.tags}>
                                {topic.tags && topic.tags.map((tag, index) => (
                                    <Chip key={index} label={tag} className={classes.tag} />
                                ))}
                            </Box>
                        </CardActions>
                    </Card>
                ))}
            </List>
        </Box>
    );
};

export default TopicList;


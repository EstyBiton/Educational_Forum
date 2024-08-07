import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TopicList from '../topic/TopicList';

const useStyles = makeStyles({
    root: {
        marginTop: '20px',
        padding: '20px',
        paddingTop: '80px', // Padding to prevent navbar from covering content
        direction: 'rtl',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#0d47a1',
    },
});

const HomePage: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="h3" gutterBottom className={classes.title}>
                ברוכים הבאים לקהילה החינוכית חינוך לעם, מרכז הידע וההשראה להורים וליועצים כאחד!
            </Typography>
            <Typography variant="h5" gutterBottom className={classes.title}>
                זהו המקום שבו הורים ויועצים נפגשים, לשיחות שמקדמות את ההורות ומעצימות את הילדים. כאן תמצאו תמיכה, עצות מקצועיות ושפע הזדמנויות לשפר את החינוך המשפחתי!
            </Typography>
            <Typography variant="h4" gutterBottom className={classes.title}>
                לאחרונה נשאל:
            </Typography>
            <TopicList />
        </Box>
    );
};

export default HomePage;

import React from 'react';
import { Typography, Box, Chip, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#0d47a1',
        textAlign: 'right',
    },
    tags: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'right',
    },
    tag: {
        marginLeft: '8px',
    },
});

const TopicHeader: React.FC<{ title: string, tags: string[] }> = ({ title, tags }) => {
        const classes = useStyles();

    return (
        <>
            <Typography variant="h4" className={classes.title}>
                {title}
            </Typography>
            <Box className={classes.tags}>
                {tags && tags.length > 0 && tags.map((tag: string, index: number) => (
                    <Chip key={index} label={tag} className={classes.tag} />
                ))}
            </Box>
        </>
    );
};


export default TopicHeader;

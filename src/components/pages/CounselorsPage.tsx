import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MailOutline, Description, Work, School, Business } from '@mui/icons-material';
import { RootState } from '../../data/redux/store';
import { setCounselors } from '../../data/redux/counselor/counselor.slice';
import { getAllCounselors } from '../../data/services/counselor.service';
import { CounselorType } from '../../data/types/counselor.types';

const useStyles = makeStyles({
    root: {
        marginTop: '100px',
        padding: '20px',
        direction: 'rtl',
    },
    title: {
        textAlign: 'center',
        color: '#2196F3',
    },
    counselorItem: {
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Ensures all cards have the same height
    },
    counselorName: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#2196F3',
        textAlign: 'center',
        marginBottom: '20px',
    },
    counselorDetails: {
        marginTop: '10px',
        fontSize: '1rem',
        color: '#555',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',
        gap: '8px',
        textAlign: 'justify', // Justify text
    },
    icon: {
        color: '#2196F3',
    },
    button: {
        marginTop: '10px',
        backgroundColor: 'transparent',
        color: 'red',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
        fontWeight: 'bold',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    buttonIcon: {
        marginLeft: '8px',
        color: 'red',
    },
});

const CounselorsPage: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const counselors = useSelector((state: RootState) => state.counselor.counselors);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: CounselorType[] = await getAllCounselors();

                // הדפסת כל היועצים והניסיון שלהם לקונסול
                data.forEach(counselor => {
                    console.log(`יועץ: ${counselor.name}, שנות ותק: ${counselor.yearsOfExperience}`);
                });

                // Sort counselors by years of experience in descending order
                const sortedData = data.map(counselor => ({
                    ...counselor,
                    password: counselor.password || '' // Add empty password if missing
                })).sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);

                dispatch(setCounselors(sortedData));
            } catch (error) {
                console.error("Failed to fetch counselors", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography variant="h3" component="h1" gutterBottom className={classes.title}>
                היועצים שלנו
            </Typography>
            <Grid container spacing={2}>
                {counselors.map((counselor) => (
                    <Grid item xs={12} sm={6} key={counselor.id}>
                        <Box className={classes.counselorItem} component={Paper}>
                            <Typography className={classes.counselorName}>
                                {counselor.name}
                            </Typography>
                            <div>
                                <div className={classes.counselorDetails}>
                                    <Description className={classes.icon} />
                                    <span><strong>מי אני:</strong> {counselor.bio}.</span>
                                </div>
                                <div className={classes.counselorDetails}>
                                    <Work className={classes.icon} />
                                    <span><strong>שנות הניסיון שצברתי:</strong> {counselor.yearsOfExperience}.</span>
                                </div>
                                <div className={classes.counselorDetails}>
                                    <School className={classes.icon} />
                                    <span><strong> המוסדות בהם למדתי:</strong> {counselor.educationalInstitutions}.</span>
                                </div>
                                <div className={classes.counselorDetails}>
                                    <Business className={classes.icon} />
                                    <span><strong>התפקידים בהם שימשתי:</strong> {counselor.workHistory}.</span>
                                </div>
                                <div className={classes.counselorDetails}>
                                    <School className={classes.icon} />
                                    <span><strong>התארים האקדמיים שרכשתי:</strong> {counselor.academicDegrees}.</span>
                                </div>
                            </div>
                            <a
                                href={`mailto:${counselor.email}?subject=פניה מיועץ&body=שלום,%0A%0Aאני מעוניין ליצור קשר עם היועץ.%0A%0Aתודה.`}
                                className={classes.button}
                            >
                                <MailOutline className={classes.buttonIcon} />
                                צור קשר עכשיו
                            </a>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CounselorsPage;
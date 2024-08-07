import ReportDialog from '../dialogs/report/ReportDialog';
import ReportSuccessDialog from '../dialogs/report/ReportSuccessDialog';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getTopicById } from '../../data/services/topic.service';
import { reportPost, addPost, likePost } from '../../data/services/post.service';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, selectUserName, selectIsAuthenticated, isProfessional } from '../../data/redux/auth/auth.selectors';
import { addPost as addPostToRedux } from '../../data/redux/post/post.slice';
import { PostType } from '../../data/types/post.types';
import { getUserById } from '../../data/services/user.service';
import { RootState } from '../../data/redux/store';
import { getCounselorById } from '../../data/services/counselor.service';
import AuthenticationDialog from '../dialogs/AuthenticationDialog';
import PostList from '../post/PostList';
import ContactCounselor from '../dialogs/contact/ContactCounselorDialog';
import TopicHeader from './TopicHeader';

const useStyles = makeStyles({
    root: {
        marginTop: '64px',
        padding: '20px',
        direction: 'rtl',
    },
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
    }

});

const TopicItem: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const classes = useStyles();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector((state: RootState) => selectAuth(state)?.user);
        const currentUserId = currentUser?.id ?? 1;
   const isCounselor = useSelector((state: RootState) => isProfessional(state));

    const [topic, setTopic] = useState<any>(null);
    const [usersMap, setUsersMap] = useState<{ [key: string]: string }>({});
    const [openDialog, setOpenDialog] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [error, setError] = useState('');
    const [hoveredSignUp, setHoveredSignUp] = useState(false);
    const [hoveredLogin, setHoveredLogin] = useState(false);
    const [likedPosts, setLikedPosts] = useState<{ [key: number]: { liked: boolean; disliked: boolean } }>({}); 0
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [reportPostId, setReportPostId] = useState<number | null>(null);
    const [reportSuccess, setReportSuccess] = useState(false); // הוספת משתנה חדש לניהול הופעת ההודעה לאחר הדיווח
    const [openContactDialog, setOpenContactDialog] = useState(false);
    const [counselorEmail, setCounselorEmail] = useState<string | null>(null);
    const [counselorName, setCounselorName] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopic = async () => {
            if (id) {
                try {
                    const topicData = await getTopicById(parseInt(id));
                    setTopic(topicData);
                } catch (error) {
                    console.error('Error fetching topicById:', error);
                }
            }
        };

        fetchTopic();
    }, [id]);

    useEffect(() => {
        const fetchUserNames = async () => {
            if (topic && topic.posts) {
                const userIds: number[] = topic.posts.map((post: PostType) => post.userId);
                const counselorIds: number[] = topic.posts.map((post: PostType) => post.counselorId);
                try {
                    const userMap: { [key: string]: string } = {};

                    for (let i = 0; i < userIds.length; i++) {
                        const userId = userIds[i];
                        const counselorId = counselorIds[i];

                        if (userId !== null && userId !== undefined) {
                            try {
                                const user = await getUserById(userId);
                                userMap[`user-${userId}`] = user.name as string;
                            } catch (error) {
                                console.error(`Failed to get user by ID ${userId}:`, error);
                                userMap[`user-${userId}`] = 'Unknown';
                            }
                        }

                        if (counselorId !== null && counselorId !== undefined) {
                            try {
                                const counselor = await getCounselorById(counselorId);
                                userMap[`counselor-${counselorId}`] = counselor.name as string;
                            } catch (error) {
                                console.error(`Failed to get counselor by ID ${counselorId}:`, error);
                                userMap[`counselor-${counselorId}`] = 'Unknown';
                            }
                        }
                    }

                    setUsersMap(userMap);
                } catch (error) {
                    console.error('Error fetching user names:', error);
                }
            }
        };

        fetchUserNames();
    }, [topic]);



    const handleOpenDialog = () => {
        setOpenDialog(true);
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setError('');
    };

    const handlePostContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPostContent(event.target.value);
    };

    const formatDate = (date1: Date): string => {
        const date = new Date(date1);
        return date.toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });
    };

    const handleAddPost = async () => {
        if (!newPostContent) {
            setError('תוכן הפוסט הוא שדה חובה');
            return;
        }

        try {
            const newPost: any = {
                content: newPostContent,
                topicId: parseInt(topic.id),
                userId: currentUserId,
                counselorId: null,
                id: 0,
                date: new Date(),
                likes: 0,
                isReported: false,
                isDeleted: false,
            };

            if (isCounselor) {
                newPost.counselorId = newPost.userId;
                newPost.userId = null;
            }

            const response = await addPost(newPost);

            const updatedTopic = { ...topic };

            if (!updatedTopic.posts) {
                updatedTopic.posts = [];
            }

            updatedTopic.posts.push(response);

            setTopic(updatedTopic);
            dispatch(addPostToRedux(response));

            setNewPostContent('');
            setError('');
            handleCloseDialog();
        } catch (error) {
            console.error('Error adding post:', error);
            setError('Failed to add post, please try again');
        }
    };

    const handleContactClick = (counselorId: number) => {
        if (!isAuthenticated) {
            console.log('איני מחובר')
            setOpenContactDialog(true);
            return;
        }
        handleMailIconClick(counselorId)
    };

    const handleOpenContactDialog = () => {
        setOpenContactDialog(true);
    };

    const handleMailIconClick = async (counselorId: number) => {
        try {
            const counselorDetails = await getCounselorById(counselorId);
            if (counselorDetails) {
                setCounselorEmail(counselorDetails.email);
                setCounselorName(counselorDetails.name);
                handleOpenContactDialog();
            }
        } catch (error) {
            console.error('Failed to fetch counselor details', error);
        }
    };

    const handleCloseContactDialog = () => {
        setOpenContactDialog(false);
    };

    const handleLikePost = async (postId: number) => {
        try {
            const updatedPost = await likePost(postId);

            const updatedTopic = { ...topic };
            const updatedPosts = updatedTopic.posts.map((post: any) =>
                post.id === postId ? { ...post, likes: updatedPost } : post
            );

            updatedTopic.posts = updatedPosts;
            setTopic(updatedTopic);
            setLikedPosts(prevLikedPosts => ({
                ...prevLikedPosts,
                [postId]: { liked: true, disliked: false },
            }));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };


    const handleReportClick = (postId: number) => {

        setOpenReportDialog(true);


        if (isAuthenticated)
            setReportPostId(postId);

    };


    const handleCloseReportDialog = () => {
        setOpenReportDialog(false);
        setReportPostId(null);
    };



    const handleConfirmReport = async () => {
        handleCloseReportDialog();
        if (reportPostId !== null) {
            try {
                await reportPost(reportPostId, { reportReason: "תוכן פוגעני" });
                console.log("Report sent successfully");
                setReportSuccess(true); // עדכון הסטייט להצגת ההודעה לאחר הדיווח המוצלח
            } catch (error) {
                console.error("Error reporting post:", error);
                alert('ארעה תקלה, אנא נסה שנית במועד מאוחר יותר')
            }
        }
    };

    if (!topic) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <Box className={classes.root}>

                <TopicHeader title={topic.title} tags={topic.tags} />

                <PostList
                    posts={topic.posts}
                    topicUserId={topic.userId}
                    usersMap={usersMap}
                    likedPosts={likedPosts}
                    handleLikePost={handleLikePost}
                    handleReportClick={handleReportClick}
                    handleContactClick={handleContactClick}
                    formatDate={formatDate}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                    style={{ marginTop: '20px', width: '100%', fontSize: '1.5em' }} // הוספת רוחב מלא, גודל גופן גדול
                    size="large" // הוספת גודל כפתור גדול
                >
                    הוספת תגובה
                </Button>

                {/* ////////////////////////////////////////////////הוספת תגובה */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    {isAuthenticated ? (
                        <>
                            <DialogTitle style={{ textAlign: 'right' }}>הוספת תגובה חדשה</DialogTitle>
                            <DialogContent style={{ textAlign: 'right', fontSize: '1.2em' }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="תוכן הפוסט"
                                    fullWidth
                                    value={newPostContent}
                                    onChange={handlePostContentChange}
                                    error={!!error}
                                    helperText={error}
                                    placeholder={isCounselor ? `${userName}, אנו מעריכים מאוד את תרומתך לפורום! ` :
                                        'שמחים לראותכם שותפים בקהילתנו החינוכית!'}
                                    style={{ direction: 'rtl', minWidth: '400px' }}
                                    multiline
                                    rows={4}
                                    maxRows={10}
                                    InputLabelProps={{ shrink: true }} //כדי שלא יופיע שום דבר כברירת מחדל בתיבת הקלט
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog} color="primary">
                                    ביטול
                                </Button>
                                <Button onClick={handleAddPost} color="primary">
                                    שלח
                                </Button>
                            </DialogActions>
                        </>
                    ) : (
                        <AuthenticationDialog
                            isOpen={openDialog}
                            onClose={handleCloseDialog}
                            hoveredSignUp={hoveredSignUp}
                            setHoveredSignUp={setHoveredSignUp}
                            hoveredLogin={hoveredLogin}
                            setHoveredLogin={setHoveredLogin}
                            warningMessage="דעתך חשובה לנו! עם זאת, רק משתמש רשום יכול להגיב"
                        />
                    )}
                </Dialog>

                {/* //////////////////////דיווח על תוכן פוגעני//////////////////// */}
                <ReportDialog
                    open={openReportDialog}
                    onClose={handleCloseReportDialog}
                    onConfirm={handleConfirmReport}
                    isAuthenticated={isAuthenticated}
                    hoveredSignUp={hoveredSignUp}
                    setHoveredSignUp={setHoveredSignUp}
                    hoveredLogin={hoveredLogin}
                    setHoveredLogin={setHoveredLogin}
                />

                <ReportSuccessDialog
                    open={reportSuccess}
                    onClose={() => setReportSuccess(false)}
                />



                {/* //////////////////////צור קשר עם יועץ//////////////////// */}
                <ContactCounselor
                    open={openContactDialog}
                    onClose={handleCloseContactDialog}
                    counselorEmail={counselorEmail}
                    counselorName={counselorName}
                    currentUser={currentUser}
                    isAuthenticated={isAuthenticated}
                    hoveredSignUp={hoveredSignUp}
                    setHoveredSignUp={setHoveredSignUp}
                    hoveredLogin={hoveredLogin}
                    setHoveredLogin={setHoveredLogin}
                />
            </Box>
        </>
    );
};

export default TopicItem;




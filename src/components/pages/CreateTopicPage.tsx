
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Subject } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addTopic } from '../../data/services/topic.service';
import { addPost } from '../../data/services/post.service';
import { addTopic as addTopicToReduxArr } from '../../data/redux/topic/topic.slice';
import { useNavigate } from 'react-router-dom';
import { TopicFormType, TopicType } from '../../data/types/topic.types';
import { PostType } from '../../data/types/post.types';
import { selectUserId } from '../../data/redux/auth/auth.selectors';
import { PATHS } from '../../routes/paths';

const CreateTopicPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TopicFormType>({
        title: '',
        userId: useSelector(selectUserId) ?? 1,
        subjectIds: [],
        postIds: [],
        wasAnswered: false,
    });
    const [initialPostContent, setInitialPostContent] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'initialPostContent') {
            setInitialPostContent(value);
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
    
        if (!formData.title) newErrors.title = 'הכותרת היא שדה חובה';
        if (!initialPostContent) newErrors.initialPostContent = 'תוכן ההודעה היא שדה חובה';
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            return;
        }
    
        try {
            const topicCreateDto = new FormData();
            topicCreateDto.append('title', formData.title);
            topicCreateDto.append('userId', formData.userId.toString());
            topicCreateDto.append('wasAnswered', formData.wasAnswered.toString());
    
            const response: TopicType = await addTopic(topicCreateDto);
            console.log('נושא נוצר:', response);
    
            if (response.id === undefined) {
                throw new Error('Topic ID is undefined');
            }
    
            const topicToAddToRedux: TopicType = {
                id: response.id,
                title: formData.title,
                wasAnswered: formData.wasAnswered,
                dateCreated: response.dateCreated,
                dateLastActive: response.dateLastActive,
                userId: formData.userId,
                subjectIds: formData.subjectIds,
                postIds: formData.postIds
            };
        
            dispatch(addTopicToReduxArr(topicToAddToRedux));
             
            const newPost: PostType = {
                id: 0,
                date: new Date(),
                likes: 0,
                content: initialPostContent,
                isReported: false,
                isDeleted: false,
                topicId: response.id,
                userId: formData.userId,
            };
            
            const postResponse = await addPost(newPost);
            console.log('הודעה נוצרה:', postResponse);
            
            formData.postIds = [...formData.postIds, postResponse.id];
                        
            navigate(PATHS.Home);
        } catch (error) {
            console.error('הייתה בעיה ביצירת הנושא או ההודעה!', error);
            setErrors({ ...errors, form: 'שגיאה ביצירת הנושא, אנא נסה שנית' });
        }
    };

    return (
        
        <Container maxWidth="sm" style={{ paddingTop: '64px' }}>
            <Typography variant="h2" align="center" gutterBottom style={{ color: '#1565C0', fontFamily: 'Comic Sans MS', marginBottom: 20 }}>
                פתיחת אשכול חדש
            </Typography>
            <form onSubmit={handleSubmit}>
                <Typography variant="body1" gutterBottom style={{ textAlign: 'right', marginBottom: 20 }}>
        </Typography>
        <TextField
  fullWidth
  margin="normal"
  label="כותרת"
  name="title"
  placeholder="הקלד כותרת עניינית וממצה"
  value={formData.title}
  onChange={handleChange}
  error={!!errors.title}
  helperText={errors.title}
  InputLabelProps={{ shrink: true }} //כדי שלא יופיע שום דבר כברירת מחדל בתיבת הקלט
  InputProps={{ autoFocus: true, style: { direction: 'rtl' } }}
  style={{ marginBottom: 20 }}
/>
                <TextField
                    fullWidth
                    margin="normal"
                    label="תוכן השאלה"
                    name="initialPostContent"
                    placeholder="פרטי השאלה, כגון גיל הילד/ה, הדילמה והפתרונות שנוסו עד כה"
                    multiline
                    rows={4}
                    value={initialPostContent}
                    onChange={handleChange}
                    error={!!errors.initialPostContent}
                    helperText={errors.initialPostContent}
                    InputLabelProps={{ shrink: true }} //כדי שלא יופיע שום דבר כברירת מחדל בתיבת הקלט
                    InputProps={{ style: { direction: 'rtl' } }}

                    style={{ marginBottom: 20 }}
                />
                <Button variant="contained" type="submit" fullWidth style={{ marginTop: 20, fontFamily: 'Comic Sans MS', backgroundColor: '#1565C0', color: 'white' }}>
                    <Typography variant="button" style={{ color: 'white' }}>צור אשכול</Typography>
                </Button>
                {errors.form && (
                    <Typography variant="body2" color="error" align="center" style={{ marginTop: 20 }}>
                        {errors.form}
                    </Typography>
                )}
            </form>
        </Container>
    );
};

export default CreateTopicPage;
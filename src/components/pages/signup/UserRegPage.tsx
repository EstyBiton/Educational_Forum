
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container,Link, Checkbox, FormControlLabel, FormControl, FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Lock, Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { addUser } from '../../../data/services/user.service';
import { FullUserType } from '../../../data/types/user.types';
import { PATHS } from '../../../routes/paths'; 
import { signin } from '../../../data/services/auth.service';
import { setSession } from '../../auth/utils';
import { setUser } from '../../../data/redux/auth/auth.slice';
import { addUser as addUserToUsersArr } from '../../../data/redux/user/user.slice';
import { debug } from 'console';
import { selectAuth } from '../../../data/redux/auth/auth.selectors';
import { store } from '../../../data/redux/store';
import { selectUserName } from '../../../data/redux/auth/auth.selectors';
import { Navigate, useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    agreeToTerms: boolean;
}

const UserRegPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        agreeToTerms: false,
    });
    const [emailExists, setEmailExists] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log('לחצו על שליחה');
        e.preventDefault();
        let newErrors: { [key: string]: string } = {};
    
        if (!formData.name) newErrors.name = 'שם משתמש הוא שדה חובה';
        if (!formData.email) {
            newErrors.email = 'אימייל הוא שדה חובה';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'אימייל לא תקין';
        }
        if (!formData.password) newErrors.password = 'סיסמה היא שדה חובה';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'חובה להסכים לתקנון הפורום';
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            return;
        }
    
        const newUser = new FormData();
        newUser.append('name', formData.name);
        newUser.append('email', formData.email);
        newUser.append('password', formData.password);
         // הוספת המשתמש למסד הנתונים
        try {
            console.log('לפני ההוספה');
            const res = await addUser(newUser);
            console.log('אחרי ההוספה');
            console.log(res);
            if (res) {
                console.log('בתוך התנאי');
          const response = await signin(formData.name, formData.password);
          console.log('הטוקן הוא, ',response.token)
          setSession(response.token);
           //אין לך פה דיספצ' של סטיוזר של מערך היוזרים. אז ברור שבמערך הכללי של היוזרים זה לא יתעדכן לך
          dispatch(setUser({ id: res, name: formData.name ,email: formData.email}))
          dispatch(addUserToUsersArr({ id: res, name: formData.name ,email: formData.email}))
          console.log('אני אחרי setUser')
         navigate(PATHS.Home);
            }
        } catch (error: any) {
            console.log('בתוך התנאי ונכשל');
            console.log(error.message);
            if (error.message === "Email and Username already exist") {
                console.log('אני כבר קיים');
                newErrors = {
                    name: 'שם משתמש כבר קיים',
                    email: 'אימייל כבר קיים'
                };
            } else if (error.message === "Email already exists") {
                newErrors = { ...newErrors, email: 'אימייל כבר קיים' };
            } else if (error.message === "Username already exists") {
                newErrors = { ...newErrors, name: 'שם משתמש כבר קיים' };
            } else {
                newErrors = { ...newErrors, general: 'אירעה שגיאה בעת יצירת המשתמש' };
            }
            setErrors(newErrors);
        }
    };
    
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Container maxWidth="sm" style={{ paddingTop: '64px' }}>
            <Typography variant="h2" align="center" gutterBottom style={{ color: '#1565C0', fontFamily: 'Comic Sans MS', marginBottom: 20 }}>
                 רישום למשתמש רגיל
            </Typography>
         
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="שם משתמש"
                    name="name"
                    placeholder="הקלד שם משתמש"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{ startAdornment: <AccountCircle style={{ color: '#1565C0' }} />, autoFocus: true, style: { direction: 'rtl' } }}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="סיסמה"
                    name="password"
                    placeholder=" הקלד סיסמה"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        startAdornment: <Lock style={{ color: '#1565C0' }} />,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: { direction: 'rtl' }
                    }}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="אימות סיסמה"
                    name="confirmPassword"
                    placeholder=" הקלד שוב את הסיסמה"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                        startAdornment: <Lock style={{ color: '#1565C0' }} />,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: { direction: 'rtl' }
                    }}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="אימייל"
                    name="email"
                    placeholder="הקלד את כתובת האימייל שלך"
                    value={formData.email}
                    onChange={handleChange}
                    error={emailExists || !!errors.email}
                    helperText={emailExists ? 'האימייל כבר קיים' : errors.email}
                    InputProps={{ startAdornment: <Email style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
                    style={{ marginBottom: 20 }}
                />
                <FormControl error={!!errors.agreeToTerms} component="fieldset" style={{ marginBottom: 20 }}>
                    <FormControlLabel
                        control={<Checkbox checked={formData.agreeToTerms} onChange={handleChange} name="agreeToTerms" />}
                        label={
                            <span style={{ direction: 'rtl', color: '#333', fontSize: 14 }}>
                                אני מתחייב/ת לעמוד ב
                                <Link href={PATHS.ForumRules} target="_blank" rel="noopener noreferrer" style={{ color: '#1565C0', textDecoration: 'none', fontWeight: 'bold' }}>
                                    תקנון הפורום
                                </Link>
                            </span>
                        }
                        labelPlacement="start"
                        style={{ direction: 'rtl' }}
                    />
                    {!!errors.agreeToTerms && <FormHelperText>{errors.agreeToTerms}</FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#1565C0', color: '#fff', fontWeight: 'bold' }}>
                    הירשם לפורום
                </Button>
            </form>
        </Container>
    );
};

export default UserRegPage;


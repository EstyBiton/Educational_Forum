import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { signin } from '../../data/services/auth.service';
import { jwtDecode, setSession } from '../auth/utils';
import { setCounselor, setUser } from '../../data/redux/auth/auth.slice';
import { PATHS } from '../../routes/paths';
import { getUserById } from '../../data/services/user.service';
import { useNavigate } from 'react-router-dom';
import { isProfessional } from '../../data/redux/auth/auth.selectors';
import { getCounselorById } from '../../data/services/counselor.service';

interface FormData {
    name: string;
    password: string;
}
const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
   
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!formData.name) newErrors.name = 'שם משתמש הוא שדה חובה';
        if (!formData.password) newErrors.password = 'סיסמה היא שדה חובה';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            console.log('בתוך הTRY')
            const response = await signin(formData.name, formData.password);
            setSession(response.token);
            const decodedToken:any = jwtDecode(response.token);
            const userId = decodedToken.id;
            console.log('האיידי הוא', userId);
            let userDetails;
            if(response.role=='counselor'){
            userDetails = await getCounselorById(userId);
            dispatch(setCounselor(userDetails));
}
else
{
    userDetails = await getUserById(userId);
dispatch(setUser(userDetails));
}

    console.log('פרטיי הם', userDetails);
           navigate(PATHS.Home);
        } catch (error) {
            setErrors({ ...errors, form: 'שגיאה בהתחברות, אנא נסה שנית' });
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Container maxWidth="sm" style={{ paddingTop: '64px' }}>
            <Typography variant="h2" align="center" gutterBottom style={{ color: '#1565C0', fontFamily: 'Comic Sans MS', marginBottom: 20 }}>
                התחברות
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
                    placeholder="הקלד סיסמה"
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
                {errors.form && (
                    <Typography color="error" style={{ marginBottom: 20 }}>
                        {errors.form}
                    </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#1565C0', color: '#fff', fontWeight: 'bold' }}>
                    התחבר
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;

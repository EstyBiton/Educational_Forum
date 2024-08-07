import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Link, IconButton, InputAdornment, Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { AccountCircle, Lock, Email, Visibility, VisibilityOff, Phone, School, Work, Badge, Description } from '@mui/icons-material';
import { PATHS } from '../../../routes/paths';
import { addCounselor } from '../../../data/services/counselor.service';
import { addCounselor as addCounselorToUsersArr } from '../../../data/redux/counselor/counselor.slice';
import { signin } from '../../../data/services/auth.service';
import { setSession } from '../../auth/utils';
import { setCounselor } from '../../../data/redux/auth/auth.slice';
import { useNavigate } from 'react-router-dom';

interface FormData {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  identityNumber: string;
  phoneNumber: string;
  name: string;
  bio: string;
  yearsOfExperience: string;
  educationalInstitutions: string;
  workHistory: string;
  academicDegrees: string;
  agreeToTerms: boolean;
}

const CounselorRegPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    identityNumber: '',
    phoneNumber: '',
    bio: '',
    yearsOfExperience: '',
    educationalInstitutions: '',
    workHistory: '',
    academicDegrees: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = 'שם מלא הוא שדה חובה';
    if (!formData.email) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'אימייל לא תקין';
    }
    if (!formData.password) newErrors.password = 'סיסמה היא שדה חובה';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'חובה להסכים לתקנון הפורום';
    if (!formData.identityNumber) newErrors.identityNumber = 'מספר זהות הוא שדה חובה';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'ניסיון הוא שדה חובה';
    if (isNaN(parseInt(formData.yearsOfExperience))) newErrors.yearsOfExperience = 'ניסיון חייב להיות מספר';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'מספר טלפון הוא שדה חובה';
    if (!formData.academicDegrees) newErrors.academicDegrees = 'תארים אקדמיים הוא שדה חובה';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newUser = new FormData();
    newUser.append('name', formData.name);
    newUser.append('email', formData.email);
    newUser.append('password', formData.password);
    newUser.append('bio', formData.bio);
    newUser.append('identityNumber', formData.identityNumber);
    newUser.append('phoneNumber', formData.phoneNumber);
    newUser.append('educationalInstitutions', formData.educationalInstitutions);
    newUser.append('yearsOfExperience', formData.yearsOfExperience);
    newUser.append('workHistory', formData.workHistory);
    newUser.append('academicDegrees', formData.academicDegrees);

    try {
      const res = await addCounselor(newUser);
      if (res) {
        const response = await signin(formData.name, formData.password);
        setSession(response.token);
        var newCounselor={
          id: res,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          bio: formData.bio,
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          educationalInstitutions: formData.educationalInstitutions,
          workHistory: formData.workHistory,
          academicDegrees: formData.academicDegrees,
        }
        dispatch(setCounselor(newCounselor));
        dispatch(addCounselorToUsersArr(newCounselor));
        navigate(PATHS.Home);
      }
    } catch (error: any) {
      if (error.message === "Email and Username already exist") {
        newErrors = {
          name: 'שם משתמש כבר קיים',
          email: 'אימייל כבר קיים',
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
  const handleOpenInfoDialog = () => setOpenInfoDialog(true);
  const handleCloseInfoDialog = () => setOpenInfoDialog(false);

  return (
    <Container maxWidth="sm" style={{ paddingTop: '64px' }}>
      <Typography variant="h2" align="center" gutterBottom style={{ color: '#1565C0', fontFamily: 'Comic Sans MS', marginBottom: 20 }}>
        רישום יועץ
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="שם מלא"
          name="name"
          placeholder="הקלד שם מלא"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{ startAdornment: <AccountCircle style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
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
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{ startAdornment: <Email style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
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
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
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
          placeholder="הקלד שוב את הסיסמה"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            startAdornment: <Lock style={{ color: '#1565C0' }} />,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}


                  edge="end"
                >
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
          label="תעודת זהות"
          name="identityNumber"
          placeholder="הקלד מספר זהות"
          value={formData.identityNumber}
          onChange={handleChange}
          error={!!errors.identityNumber}
          helperText={errors.identityNumber}
          InputProps={{ startAdornment: <Badge style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="טלפון"
          name="phoneNumber"
          placeholder="הקלד מספר טלפון"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          InputProps={{ startAdornment: <Phone style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="ניסיון"
          name="yearsOfExperience"
          placeholder="הקלד שנות ניסיון"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          error={!!errors.yearsOfExperience}
          helperText={errors.yearsOfExperience}
          InputProps={{ startAdornment: <Work style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="מוסדות לימוד"
          name="educationalInstitutions"
          placeholder="הקלד מוסדות לימוד"
          value={formData.educationalInstitutions}
          onChange={handleChange}
          InputProps={{ startAdornment: <School style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="היסטוריה תעסוקתית"
          name="workHistory"
          placeholder="הקלד היסטוריה תעסוקתית"
          value={formData.workHistory}
          onChange={handleChange}
          InputProps={{ startAdornment: <Description style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="תארים אקדמיים"
          name="academicDegrees"
          placeholder="הקלד תארים אקדמיים"
          value={formData.academicDegrees}
          onChange={handleChange}
          error={!!errors.academicDegrees}
          helperText={errors.academicDegrees}
          InputProps={{ startAdornment: <School style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="קצת על עצמך"
          name="bio"
          placeholder="הקלד ביוגרפיה קצרה"
          value={formData.bio}
          onChange={handleChange}
          InputProps={{ startAdornment: <Description style={{ color: '#1565C0' }} />, style: { direction: 'rtl' } }}
          style={{ marginBottom: 20 }}
        />
        <FormControl
          error={!!errors.agreeToTerms}
          component="fieldset"
          style={{ marginBottom: 20 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={handleChange}
                name="agreeToTerms"
                color="primary"
              />
            }
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
          <FormHelperText>{errors.agreeToTerms}</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          רישום
        </Button>
      </form>
      <Dialog
        open={openInfoDialog}
        onClose={handleCloseInfoDialog}
      >
        <DialogTitle>תנאי השירות</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            כאן יש להוסיף את תנאי השירות.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfoDialog} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CounselorRegPage;
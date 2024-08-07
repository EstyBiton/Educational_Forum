import React from 'react';
import { Dialog, DialogContent, Typography, Box, Link } from '@mui/material';
import Warning from '@mui/icons-material/Warning';
import { Link as RouterLink } from 'react-router-dom';
import { PATHS } from '../../routes/paths'; // אם יש לך קבצי קונסטנטות לנתיבים
import useStyles from '../../styles/useStyles'; // ייבוא ה-hook של המחלקות

interface AuthenticationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    hoveredSignUp: boolean;
    setHoveredSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    hoveredLogin: boolean;
    setHoveredLogin: React.Dispatch<React.SetStateAction<boolean>>;
    warningMessage: string; 
}

const AuthenticationDialog: React.FC<AuthenticationDialogProps> = ({
    isOpen,
    onClose,
    hoveredSignUp,
    setHoveredSignUp,
    hoveredLogin,
    setHoveredLogin,
    warningMessage
}) => {
    const classes = useStyles(); // יצירת מחלקות ה-CSS

    const handleLinkClick = (path: string) => {
        onClose();
        window.location.href = path;
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent className={classes.dialogContent}>
                <Warning className={classes.warningIcon} style={{ fontSize: '8em' }} />
                <Typography variant="h4" className={classes.heading}>
                    {warningMessage} 
                </Typography>
                <Box className={classes.flexContainer}>
                    <Box
                        className={classes.linkContainer}
                        onMouseEnter={() => setHoveredSignUp(true)}
                        onMouseLeave={() => setHoveredSignUp(false)}
                        onClick={() => handleLinkClick(PATHS.UserSignUp)}
                    >
                        <Link underline="none">
                            הירשם
                        </Link>
                        <Box className={classes.underline} style={{ width: hoveredSignUp ? '100%' : '0%' }} />
                    </Box>
                    <Typography variant="body1" component="span" style={{ margin: '0 10px', fontSize: '1em' }}>
                        או
                    </Typography>
                    <Box
                        className={classes.linkContainer}
                        onMouseEnter={() => setHoveredLogin(true)}
                        onMouseLeave={() => setHoveredLogin(false)}
                        onClick={() => handleLinkClick(PATHS.LogIn)}>
                        <Link  underline="none">
                            התחבר
                        </Link>
                        <Box className={classes.underline} style={{ width: hoveredLogin ? '100%' : '0%' }} />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AuthenticationDialog;


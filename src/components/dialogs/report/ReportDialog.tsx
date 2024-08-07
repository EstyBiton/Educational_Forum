import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';
import AuthenticationDialog from '../AuthenticationDialog';

interface ReportDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isAuthenticated: boolean;
    hoveredSignUp: boolean;
    setHoveredSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    hoveredLogin: boolean;
    setHoveredLogin: React.Dispatch<React.SetStateAction<boolean>>;

}

const ReportDialog: React.FC<ReportDialogProps> = ({ 
    open,
     onClose,
      onConfirm,
      isAuthenticated,
      hoveredSignUp,
      setHoveredSignUp,
      hoveredLogin,
      setHoveredLogin,  
    }) => {
    return (
        <Dialog open={open} onClose={onClose}>
                        {isAuthenticated ? (
                <>

            <DialogTitle>דיווח על תוכן פוגעני</DialogTitle>
            <DialogContent>
                <Typography>?האם אתה בטוח שברצונך לדווח על התגובה הזו</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={onConfirm} color="secondary">
                    דווח
                </Button>
            </DialogActions>
            </>
            ) : (
                <AuthenticationDialog
                        isOpen={open}
                        onClose={onClose}
                        hoveredSignUp={hoveredSignUp}
                        setHoveredSignUp={setHoveredSignUp}
                        hoveredLogin={hoveredLogin}
                        setHoveredLogin={setHoveredLogin}
                        warningMessage="אנו מודים לך על ערנותך! עם זאת, רק משתמש רשום יכול לדווח" 
                />
            )}

        </Dialog>
    );
};

export default ReportDialog;

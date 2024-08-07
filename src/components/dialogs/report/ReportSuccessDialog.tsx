import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

interface ReportSuccessDialogProps {
    open: boolean;
    onClose: () => void;
}

const ReportSuccessDialog: React.FC<ReportSuccessDialogProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ textAlign: 'right' }}>הדיווח התקבל בהצלחה</DialogTitle>
            <DialogContent>
                <Typography style={{ textAlign: 'right' }}>תודה על ערנותך ועל תרומתך לסדרי הפורום</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReportSuccessDialog;

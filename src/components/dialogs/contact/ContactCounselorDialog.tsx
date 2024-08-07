
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import AuthenticationDialog from '../AuthenticationDialog';
import { ContactCounselorRequest, contactCounselor } from '../../../data/services/contact.service';

interface ContactCounselorProps {
    open: boolean;
    onClose: () => void;
    isAuthenticated: boolean;
    counselorEmail: string | null;
    counselorName: string | null;
    currentUser: any;
    hoveredSignUp: boolean;
    setHoveredSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    hoveredLogin: boolean;
    setHoveredLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactCounselor: React.FC<ContactCounselorProps> = ({
    open,
    onClose,
    isAuthenticated,
    counselorEmail,
    counselorName,
    currentUser,
    hoveredSignUp,
    setHoveredSignUp,
    hoveredLogin,
    setHoveredLogin,
}) => {
    const [contactMessage, setContactMessage] = useState('');

    const handleContactMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactMessage(event.target.value);
    };

    useEffect(() => {
        if (!open) {
            setContactMessage('');
        }
    }, [open]);

    const handleSendContact = async () => {
        if (currentUser && contactMessage) {
            const defaultCounselorName = counselorName || '';
            const defaultCounselorEmail = counselorEmail || '';

            const request: ContactCounselorRequest = {
                userName: currentUser.name,
                userEmail: currentUser.email,
                message: contactMessage,
                counselorName: defaultCounselorName,
                counselorEmail: defaultCounselorEmail
            };

            onClose();

            try {
                await contactCounselor(request);
            } catch (error) {
                console.error('Error sending contact message:', error);
                alert('שגיאה בשליחת ההודעה, נסה שנית מאוחר יותר.');
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            {isAuthenticated ? (
                <>
                    <DialogTitle style={{ textAlign: 'right' }}>צור קשר עם היועצ/ת</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="תוכן ההודעה"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            style={{ direction: 'rtl' }}
                            value={contactMessage}
                            onChange={handleContactMessageChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            ביטול
                        </Button>
                        <Button onClick={handleSendContact} color="primary">
                            שלח
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
                        warningMessage="היועצ/ת כאן בשבילך! עם זאת, רק משתמשים רשומים יכולים ליצור קשר" 
                                    />
            )}
        </Dialog>
    );
};

export default ContactCounselor;
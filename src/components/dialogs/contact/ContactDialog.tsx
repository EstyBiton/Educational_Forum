import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { contactGeneral, ContactRequest } from '../../../data/services/contact.service';
import { selectAuth } from '../../../data/redux/auth/auth.selectors';
import { RootState } from '../../../data/redux/store';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dialogContent: {
    direction: 'rtl',
  },
});

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const currentUser = useSelector((state: RootState) => selectAuth(state)?.user);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setMessage('');
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (currentUser && message) {
      const request: ContactRequest = {
        userName: currentUser.name,
        userEmail: currentUser.email,
        message: message,
      };

      try {
        onClose();
        await contactGeneral(request);
      } catch (error) {
        console.error('Error sending contact message:', error);
        alert('שגיאה בשליחת ההודעה, נסה שנית מאוחר יותר.');
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6" gutterBottom>
          צרו קשר
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="message"
          label="הודעה"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          ביטול
        </Button>
        <Button onClick={handleSubmit} color="primary">
          שלח
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDialog;
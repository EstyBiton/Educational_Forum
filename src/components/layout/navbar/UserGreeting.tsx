import React from 'react';
import Typography from '@mui/material/Typography';

interface UserGreetingProps {
  userName: string | null;
  handleLogout: () => void;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ userName, handleLogout }) => {
  return (
    <>
      <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1, textAlign: 'right', marginRight: '1rem' }}>
        {userName ? `שלום, ${userName}` : ''}
      </Typography>
      {userName && (
        <Typography variant="h6" noWrap component="div" sx={{ cursor: 'pointer', textAlign: 'right' }} onClick={handleLogout}>
          התנתקות
        </Typography>
      )}
    </>
  );
};

export default UserGreeting;

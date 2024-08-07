import React from 'react';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PATHS } from '../../../routes/paths';

const LinkTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
  '& a, & span': {
    color: 'inherit',
    textDecoration: 'none',
    position: 'relative',
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.light,
      transition: 'color 0.3s',
    },
    '&:hover::after': {
      width: '100%',
      transition: 'width 0.3s',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '0%',
      height: '2px',
      backgroundColor: theme.palette.primary.light,
      transition: 'width 0.3s',
    },
  },
}));

interface NavigationMenuProps {
  handleRegistrationMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleNewTopicClick: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ handleRegistrationMenuOpen, handleNewTopicClick }) => {
  return (
    <>
      <LinkTypography variant="h6">
        <Link to={PATHS.Home}>בית</Link>
      </LinkTypography>

      <LinkTypography variant="h6">
        <span onClick={handleRegistrationMenuOpen} style={{ cursor: 'pointer' }}>הרשמה</span>
      </LinkTypography>

      <LinkTypography variant="h6">
        <span onClick={handleNewTopicClick} style={{ cursor: 'pointer' }}>אשכול חדש</span>
      </LinkTypography>

      <LinkTypography variant="h6">
        <Link to={PATHS.Counselors}>היועצים שלנו</Link>
      </LinkTypography>

      <LinkTypography variant="h6">
        <Link to={PATHS.About}>מי אנחנו</Link>
      </LinkTypography>
    </>
  );
};

export default NavigationMenu;

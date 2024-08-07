import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { PATHS } from '../../../routes/paths';
import { selectUserName, selectIsAuthenticated, isProfessional } from '../../../data/redux/auth/auth.selectors';
import { logout } from '../../auth/utils'; 
import { useAppDispatch } from '../../../data/hooks'; 
import { useState } from 'react';
import AuthenticationDialog from '../../dialogs/AuthenticationDialog';
import NavigationMenu from './NavigationMenu';
// import NavigationMenu from './NavigationMenu';
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

export default function PrimarySearchAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isCounselor = useSelector(isProfessional);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [registrationAnchorEl, setRegistrationAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedForm, setSelectedForm] = React.useState<null | string>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hoveredSignUp, setHoveredSignUp] = useState(false);
  const [hoveredLogin, setHoveredLogin] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isRegistrationMenuOpen = Boolean(registrationAnchorEl);

  const handleNewTopicClick = () => {
    if (isAuthenticated) {
      if (!isCounselor) {
        navigate(PATHS.NewTopic);
      }
      else {
        setDialogOpen(true);

      }
    }
    else {
      setDialogOpen(true);

    }
  };

  // const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleRegistrationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setRegistrationAnchorEl(event.currentTarget);
  };

  const handleRegistrationMenuClose = () => {
    setRegistrationAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleRegistrationOptionClick = (option: string) => {
    setSelectedForm(option);
    handleRegistrationMenuClose();
    navigate(option === 'user' ? PATHS.UserSignUp : PATHS.CounselorSignUp);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(PATHS.LogIn); // הפניה למסך ההתחברות לאחר ההתנתקות
  };
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  // //התפריט המוצג בעת הקטנת המסך
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //   </Menu>
  // );

  return (
    <Box sx={{ flexGrow: 1 }} dir="rtl">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

       <NavigationMenu 
            handleRegistrationMenuOpen={handleRegistrationMenuOpen} 
            handleNewTopicClick={handleNewTopicClick} 
          />

          {isRegistrationMenuOpen && (
            <Menu
              dir="rtl"
              anchorEl={registrationAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isRegistrationMenuOpen}
              onClose={handleRegistrationMenuClose}
            >
              <MenuItem onClick={() => handleRegistrationOptionClick('user')}>משתמש</MenuItem>
              <MenuItem onClick={() => handleRegistrationOptionClick('counselor')}>יועץ</MenuItem>
            </Menu>
          )}

          <Typography color="silver" variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
            שלום {userName || "אורח"}
          </Typography>

          <Typography
            color="yellow"
            variant="h6"
            onClick={handleLogout}
            sx={{ marginRight: '10px', cursor: 'pointer' }}
          >
            {userName ? 'התנתקות' : 'התחברות'}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <AuthenticationDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        hoveredSignUp={hoveredSignUp}
        setHoveredSignUp={setHoveredSignUp}
        hoveredLogin={hoveredLogin}
        setHoveredLogin={setHoveredLogin}
        warningMessage={isCounselor ? `${userName}, אנו מעריכים מאוד את תרומתך לפורום! עם זאת, למען שמירה על סדרי הפורום, רק משתמשים רגילים יכולים לפתוח אשכול חדש` :
          'רק משתמש רשום יכול לפתוח אשכול חדש'}
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >

      </Menu>
    </Box>
  );
}


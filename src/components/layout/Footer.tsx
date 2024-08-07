import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PATHS } from '../../routes/paths';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../data/redux/auth/auth.selectors';
import ContactDialog from '../dialogs/contact/ContactDialog';
import AuthenticationDialog from '../dialogs/AuthenticationDialog';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "5vh"
  },
  footer: {
    padding: theme.spacing(1, 2),
    backgroundColor: '#1471F1',
    direction: 'rtl',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1000,
    borderTop: `1px solid ${theme.palette.primary.light}`, // הוספת קו עליון
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }
  },
  copyright: {
    textAlign: "center",
    fontSize: "0.9rem", // הקטנתי עוד קצת את הטקסט
    "& a, & span": {
      textDecoration: "none",
      color: "white",
      transition: "color 0.3s",
      margin: "0 10px",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        backgroundColor: theme.palette.primary.light,
        transition: 'width 0.3s',
      },
      "&:hover": {
        color: theme.palette.primary.light,
        "&::after": {
          width: '100%',
        }
      }
    }
  }
}));

export default function Footer() {
  const classes = useStyles();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [contactOpen, setContactOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [hoveredSignUp, setHoveredSignUp] = useState(false);
  const [hoveredLogin, setHoveredLogin] = useState(false);

  const handleContactClick = () => {
    if (isAuthenticated) {
      setContactOpen(true);
    } else {
      setAuthDialogOpen(true);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body2" className={classes.copyright}>
            <Link color="inherit" href={PATHS.ForumRules}>
              תקנון
            </Link>{" "}
            <Link color="inherit" onClick={handleContactClick}>
              צור קשר
            </Link>{" "}
            <span>© כל הזכויות שמורות {new Date().getFullYear()}</span>
          </Typography>
        </Container>
      </footer>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <AuthenticationDialog
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        hoveredSignUp={hoveredSignUp}
        setHoveredSignUp={setHoveredSignUp}
        hoveredLogin={hoveredLogin}
        setHoveredLogin={setHoveredLogin}
        warningMessage="רק משתמש רשום יכול ליצור קשר"
      />
    </div>
  );
}

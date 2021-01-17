import React, { Fragment } from 'react';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import {
  Container,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from 'assets/BIM_GENIE_GREEN_100p.jpg';
import HelpIcon from 'assets/HelpIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbarContainer: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  navbarLogo: {
    height: 65,
    widht: 65,
  },
  navbarTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  navbarTitle: {
    textAlign: 'left',
    margin: 'auto',
    paddingLeft: theme.spacing(3),
  },
}));

const LogoutPage = ({
  match: {
    params: { studioId },
  },
}) => {
  const classes = useStyles();

  const openInPopup = () => {
    window.open(
      `https://system.onuma.com/${studioId}/get-in-touch?url=${encodeURIComponent(
        window.location.href
      )}`,
      'window',
      'toolbar=no, menubar=no, resizable=no, width=400,height=500, top=300, left=300'
    );
  };
  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar classes={{ root: classes.navbarContainer }}>
          <div className={classes.navbarTitleContainer}>
            <img src={logo} alt='logo' className={classes.navbarLogo} />
          </div>
          <IconButton
            onClick={() => {
              openInPopup();
            }}
            color='inherit'>
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 20, textAlign: 'center' }}>
        <Typography variant='subtitle1'>
          <EmojiPeopleIcon /> {``}Thanks for visiting, you are now logged out!
        </Typography>
        <Typography variant='body2'>
          Use the link in you email to log back in.
        </Typography>
      </Container>
    </Fragment>
  );
};

export default LogoutPage;

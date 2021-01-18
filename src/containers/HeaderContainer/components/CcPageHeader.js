import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';

import HelpIcon from 'assets/HelpIcon';
import logo from 'assets/BIM_GENIE_GREEN_100p.jpg';

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

const CcPageHeader = ({
  match: {
    params: { studioId },
  },
  token,
  email,
}) => {
  const classes = useStyles();
  const openInPopup = () => {
    window.open(
      `https://system.onuma.com/${studioId}/get-in-touch?url=${encodeURIComponent(
        window.location.href
      )}/${token}`,
      'window',
      'toolbar=no, menubar=no, resizable=no, width=400,height=500, top=300, left=300'
    );
  };

  return (
    <div data-testid='tech-header'>
      <AppBar position='static'>
        <Toolbar classes={{ root: classes.navbarContainer }}>
          <div className={classes.navbarTitleContainer}>
            <img src={logo} alt='logo' className={classes.navbarLogo} />
            <Typography
              style={{ textDecoration: 'inherit' }}
              component='h6'
              variant='h6'
              className={classes.navbarTitle}>
              {email && email}
            </Typography>
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
    </div>
  );
};

CcPageHeader.propTypes = {
  email: PropTypes.string,
  token: PropTypes.string,
  match: PropTypes.object.isRequired,
};

export default CcPageHeader;

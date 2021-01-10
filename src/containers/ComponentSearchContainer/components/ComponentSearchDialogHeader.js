import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import logo from 'assets/BIM_GENIE_GREEN_100p.jpg';

const useStyles = makeStyles((theme) => ({
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

const ComponentSearchDialogHeader = ({ text, handleClose, isMobile }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='static'>
        <Toolbar classes={{ root: classes.navbarContainer }}>
          <div className={classes.navbarTitleContainer}>
            <img src={logo} alt='logo' className={classes.navbarLogo} />
            <Typography
              style={{ fontSize: '16px' }}
              component='h6'
              variant='h6'
              className={classes.navbarTitle}>
              {text}
            </Typography>
          </div>
          {isMobile ? (
            <Button onClick={handleClose} color='inherit'>
              <CloseIcon />
            </Button>
          ) : (
            <Button onClick={handleClose} color='inherit'>
              Close <CloseIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

ComponentSearchDialogHeader.propTypes = {
  text: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ComponentSearchDialogHeader;

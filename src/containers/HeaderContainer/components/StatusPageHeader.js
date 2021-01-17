import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';

import HelpIcon from 'assets/HelpIcon';
import LogoutIcon from 'assets/LogoutIcon';
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

const StatusPageHeader = ({
  match: {
    params: { studioId },
  },
  authToken,
  email,
  isAuth,
  logout,
  history,
}) => {
  const classes = useStyles();
  const isWorkorder = !(
    useLocation().pathname.split('/').slice(-2)[0] === 'requester'
  );
  const openInPopup = () => {
    window.open(
      `https://system.onuma.com/${studioId}/get-in-touch?url=${encodeURIComponent(
        window.location.href
      )}/${authToken}`,
      'window',
      'toolbar=no, menubar=no, resizable=no, width=400,height=500, top=300, left=300'
    );
  };
  const handleLogout = () => {
    logout();
    history.push(`${process.env.PUBLIC_URL}/${studioId}/logout`);
  };

  return (
    <div data-testid='status-header'>
      <AppBar position='static'>
        <Toolbar classes={{ root: classes.navbarContainer }}>
          <div className={classes.navbarTitleContainer}>
            <img src={logo} alt='logo' className={classes.navbarLogo} />
            {isWorkorder && (
              <IconButton
                data-testid='menu-button'
                color='inherit'
                component={Link}
                to={`${process.env.PUBLIC_URL}/${studioId}/requester/${
                  email && email
                }`}>
                <FormatListBulletedRoundedIcon style={{ fontSize: 40 }} />
              </IconButton>
            )}
            {!isWorkorder && isAuth && (
              <IconButton onClick={handleLogout} color='inherit'>
                <LogoutIcon />
              </IconButton>
            )}
            <Typography
              style={{ textDecoration: 'inherit' }}
              component={Link}
              to={`${process.env.PUBLIC_URL}/${studioId}/technicians/${
                email && email
              }`}
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

StatusPageHeader.propTypes = {
  authToken: PropTypes.string,
  email: PropTypes.string,
  isAuth: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export default StatusPageHeader;

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';

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

const TechPageHeader = ({
  studio = 26,
  token = 'test',
  name = 'leo',
  dialogHeader,
  text,
  isMobile,
  email = 'lm@onuma.com',
}) => {
  const classes = useStyles();
  //   const isWorkorder = !(
  //     useLocation().pathname.split('/').slice(-2)[0] === 'technicians'
  //   );
  const openInPopup = () => {
    const newWindow = window.open(
      `https://system.onuma.com/${studio}/get-in-touch?url=${encodeURIComponent(
        window.location.href
      )}/${token}`,
      'window',
      'toolbar=no, menubar=no, resizable=no, width=400,height=500, top=300, left=300'
    );
    if (newWindow) newWindow.opener = null;
  };
  return (
    <div>
      <AppBar position='static'>
        <Toolbar classes={{ root: classes.navbarContainer }}>
          <div className={classes.navbarTitleContainer}>
            <img src={logo} alt='logo' className={classes.navbarLogo} />
            {
              //isWorkorder && !dialogHeader && (
              <IconButton
                color='inherit'
                component={Link}
                to={`${process.env.PUBLIC_URL}/${studio}/technicians/${
                  email && email
                }`}>
                <FormatListBulletedRoundedIcon style={{ fontSize: 40 }} />
              </IconButton>
              //    )
            }
            <Typography
              style={
                dialogHeader
                  ? { fontSize: '16px' }
                  : { textDecoration: 'inherit' }
              }
              component={dialogHeader ? 'h6' : Link}
              to={`${process.env.PUBLIC_URL}/${studio}/technicians/${
                email && email
              }`}
              variant='h6'
              className={classes.navbarTitle}>
              {dialogHeader && text} {!dialogHeader && name && name}
            </Typography>
          </div>
          {
            //dialogHeader &&
            // (isMobile ? (
            //   <Button onClick={handleClose} color='inherit'>
            //     <CloseIcon />
            //   </Button>
            // ) : (
            //   <Button onClick={handleClose} color='inherit'>
            //     Close <CloseIcon />
            //   </Button>
            // ))
          }

          {!dialogHeader && (
            <IconButton
              onClick={() => {
                openInPopup();
              }}
              color='inherit'>
              <HelpIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

TechPageHeader.propTypes = {
  // email: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  text: PropTypes.array.isRequired,
  dialogHeader: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  token: PropTypes.string,
};

TechPageHeader.defaultProps = {
  text: ['Assignments'],
  dialogHeader: false,
  isMobile: false,
};

export default TechPageHeader;

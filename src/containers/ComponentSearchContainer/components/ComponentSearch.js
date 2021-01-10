import React, { Fragment, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Tooltip, Hidden, Typography, Button } from '@material-ui/core';
import ComponentSearchDialog from './ComponentSearchDialog';

const useStyles = makeStyles((theme) => ({
  btnWidth: {
    width: '190px',
  },
  commentBtnCtr: {
    padding: '12px 0px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: '15px',
    },
  },
  paddingTopS: {
    paddingTop: theme.spacing(2),
  },
}));

const ComponentSearch = (props) => {
  const classes = useStyles();
  const [openSearchDailog, setOpenSearchDialog] = useState(false);
  const [openQrReader, setOpenQrReader] = useState(false);

  const handleOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
    setOpenQrReader(false);
  };

  return (
    <Fragment>
      <Grid item container spacing={3}>
        <Grid item xs={12} className={classes.commentBtnCtr}>
          <Tooltip
            title='Search for components if the work order is related to components in another location'
            placement='bottom'>
            <Button
              className={classes.btnWidth}
              onClick={handleOpenSearchDialog}
              variant='contained'
              color='secondary'>
              Search components
            </Button>
          </Tooltip>
          <Hidden smUp>
            <Typography
              className={classes.paddingTopS}
              variant='subtitle2'
              align='center'
              color='textPrimary'>
              Search for components if the work order is related to components
              in another location
            </Typography>
          </Hidden>
        </Grid>
      </Grid>

      <ComponentSearchDialog
        open={openSearchDailog}
        handleClose={handleCloseSearchDialog}
        openQrReader={openQrReader}
        setOpenQrReader={setOpenQrReader}
        {...props}
      />
    </Fragment>
  );
};

export default memo(ComponentSearch);

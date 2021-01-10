import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  Grid,
  IconButton,
  Chip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import ComponentDetailDialogGrid from './ComponentDetailDialogGrid';
import { componentDialogFieldGen } from 'utils/HelperFunctions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnClose: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContentDivider: {
    [theme.breakpoints.down('xs')]: {
      padding: '16px 6px',
    },
  },
  detailCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
      textAlign: 'center',
    },
  },
  detailStyle: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    textAlign: 'left',
    paddingTop: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  labelCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0px !important',
    },
  },
  labelStyle: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
    color: theme.palette.text.primary,
  },
}));

const ComponentDetailDialog = ({ open, handleClose, dialogComponent }) => {
  const { name, instance_name, attachments } = dialogComponent;

  //   helper function to generate dialog fields
  const fields = componentDialogFieldGen(dialogComponent);

  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      aria-labelledby='component-dialog-title'
      open={open}>
      <DialogTitle id='component-dialog-title'>
        {name}
        {instance_name && ` - ${instance_name}`}
        <IconButton
          aria-label='close'
          className={classes.btnClose}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        classes={{ dividers: classes.dialogContentDivider }}>
        <Grid item container direction='column' xs={12}>
          <ComponentDetailDialogGrid fields={fields} />
        </Grid>
        {attachments.map((a) => {
          return a.type === 'img' ? (
            <Grid
              style={{ textAlign: 'center' }}
              key={a.url}
              item
              container
              direction='column'
              xs={12}>
              <a
                style={{ paddingTop: '12px' }}
                href={a.url}
                target='_blank'
                rel='noopener noreferrer'>
                <img src={a.thumbnail} alt='thumbnail' />
              </a>
            </Grid>
          ) : (
            <Grid key={a.url} item container direction='column' xs={12}>
              <Grid item container spacing={2}>
                <Grid className={classes.labelCtr} item xs={4}>
                  <div
                    style={{ paddingTop: '10px' }}
                    className={classes.labelStyle}>
                    File
                  </div>
                </Grid>
                <Grid className={classes.detailCtr} item xs={8}>
                  <div
                    style={{ whiteSpace: 'pre-line' }}
                    className={classes.detailStyle}>
                    <Chip
                      label={a.text}
                      component='a'
                      href={a.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      clickable
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

ComponentDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dialogComponent: PropTypes.object,
};

export default ComponentDetailDialog;

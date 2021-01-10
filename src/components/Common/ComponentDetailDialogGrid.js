import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    paddingTop: theme.spacing(1),
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

const renderGrid = (fields, classes) => {
  return _.map(fields, ({ lable, detail }, index) => {
    return (
      <Fragment key={index}>
        <Grid className={classes.labelCtr} item xs={4}>
          <Typography className={classes.labelStyle}>{lable}</Typography>
        </Grid>
        <Grid className={classes.detailCtr} item xs={8}>
          <Typography
            style={{ whiteSpace: 'pre-line' }}
            className={classes.detailStyle}>
            {detail}
          </Typography>
        </Grid>
      </Fragment>
    );
  });
};

const ComponentDetailDialogGrid = ({ fields }) => {
  const classes = useStyles();
  return (
    <Grid item container spacing={2}>
      {renderGrid(fields, classes)}
    </Grid>
  );
};

ComponentDetailDialogGrid.propTypes = {
  fields: PropTypes.array.isRequired,
};

export default ComponentDetailDialogGrid;

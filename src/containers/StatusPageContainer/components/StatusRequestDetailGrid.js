import React, { Fragment } from 'react';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  statusWorkOrderFieldGen1,
  statusWorkOrderFieldGen2,
} from '../../../utils/HelperFunctions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  detailCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
      textAlign: 'center',
    },
  },
  detailRed: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.info.main,
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

export const StatusRequestDetailGrid1 = ({ workorder }) => {
  const classes = useStyles();

  const FIELDS = statusWorkOrderFieldGen1(workorder);

  return _.map(FIELDS, ({ lable, detail, detailColor }) => {
    return (
      <Fragment key={lable}>
        <Grid className={classes.labelCtr} item xs={12} sm={4} lg={5}>
          <Typography variant='subtitle1' className={classes.labelStyle}>
            {lable}
          </Typography>
        </Grid>
        <Grid className={classes.detailCtr} item xs={12} sm={8} lg={7}>
          <Typography
            variant='body1'
            className={
              detailColor ? classes[detailColor] : classes.detailStyle
            }>
            {detail}
          </Typography>
        </Grid>
      </Fragment>
    );
  });
};

StatusRequestDetailGrid1.propTypes = {
  workorder: PropTypes.object.isRequired,
};
export const StatusRequestDetailGrid2 = ({ workorder }) => {
  const classes = useStyles();

  const FIELDS = statusWorkOrderFieldGen2(workorder);

  return _.map(FIELDS, ({ lable, detail, detailColor }) => {
    return (
      <Fragment key={lable}>
        <Grid className={classes.labelCtr} item xs={12} sm={4} lg={5}>
          <Typography variant='subtitle1' className={classes.labelStyle}>
            {lable}
          </Typography>
        </Grid>
        <Grid className={classes.detailCtr} item xs={12} sm={8} lg={7}>
          <Typography
            variant='body1'
            className={
              detailColor ? classes[detailColor] : classes.detailStyle
            }>
            {detail}
          </Typography>
        </Grid>
      </Fragment>
    );
  });
};

StatusRequestDetailGrid2.propTypes = {
  workorder: PropTypes.object.isRequired,
};

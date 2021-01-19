import React, { Fragment, memo } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  workOrderRequestFieldGen,
  workOrderCommentFieldGen,
  workOrderLocationFieldGen,
} from 'utils/HelperFunctions';

const useStyles = makeStyles((theme) => ({
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
  detailRed: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    paddingTop: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.info.main,
  },
}));

const renderfields = (fields, classes) => {
  return _.map(fields, ({ lable, detail, detailColor }) => {
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
            className={detailColor ? classes.detailRed : classes.detailStyle}>
            {detail}
          </Typography>
        </Grid>
      </Fragment>
    );
  });
};

const RequestNumberGrid = ({ workorder }) => {
  const classes = useStyles();

  const fields = workOrderRequestFieldGen(workorder);

  return renderfields(fields, classes);
};

const RequestCommentGrid = ({ workorder }) => {
  const classes = useStyles();

  const fields = workOrderCommentFieldGen(workorder);

  return renderfields(fields, classes);
};

const RequestLocationGrid = ({ workorder }) => {
  const classes = useStyles();

  const fields = workOrderLocationFieldGen(workorder);

  return renderfields(fields, classes);
};

const RequestPmGrid = ({ workorder, setOpenPmDialog }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {workorder.preventive_maintenance_description && (
        <Fragment>
          <Grid className={classes.labelCtr} item xs={12} sm={4} lg={5}>
            <Typography variant='subtitle1' className={classes.labelStyle}>
              PM description
            </Typography>
          </Grid>
          <Grid className={classes.detailCtr} item xs={12} sm={8} lg={7}>
            <Typography variant='body1' className={classes.detailStyle}>
              {workorder.preventive_maintenance_description}
            </Typography>
          </Grid>
        </Fragment>
      )}
      {workorder.maintenance_procedures.length > 0 && (
        <Fragment>
          <Grid className={classes.labelCtr} item xs={12} sm={4} lg={5}>
            <Typography variant='subtitle1' className={classes.labelStyle}>
              Maintenance procedure:
            </Typography>
          </Grid>
          <Grid className={classes.detailCtr} item xs={12} sm={8} lg={7}>
            <Button
              size='small'
              style={{
                justifyContent: 'left',
                textTransform: 'none',
              }}
              onClick={() => setOpenPmDialog(true)}
              fullWidth
              variant='contained'
              color='primary'>
              <Typography variant='body1'>
                {workorder.maintenance_procedure_name ||
                  'Maintenance procedure'}
              </Typography>
            </Button>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

RequestNumberGrid.propTypes = {
  workorder: PropTypes.object.isRequired,
};

RequestCommentGrid.propTypes = {
  workorder: PropTypes.object.isRequired,
};

RequestLocationGrid.propTypes = {
  workorder: PropTypes.object.isRequired,
};

RequestPmGrid.propTypes = {
  workorder: PropTypes.object.isRequired,
  setOpenPmDialog: PropTypes.func.isRequired,
};

export const MemoRequestNumberGrid = memo(RequestNumberGrid);

export const MemoRequestCommentGrid = memo(RequestCommentGrid);

export const MemoRequestLocationGrid = memo(RequestLocationGrid);

export const MemoRequestPmGrid = memo(RequestPmGrid);

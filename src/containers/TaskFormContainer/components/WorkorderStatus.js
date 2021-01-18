import React, { Fragment } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  detailCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0px !important',
      textAlign: 'center',
    },
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
  paddingTopS: {
    paddingTop: theme.spacing(2),
  },
}));

const CustomRadioGroup = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  return (
    <RadioGroup
      aria-label='workorder-status'
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}>
      {children}
    </RadioGroup>
  );
};
const WorkOrderStatus = ({ workorderStatus, techId, workorderTechId }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.labelCtr} item xs={12} sm={3}>
        <Typography
          variant='subtitle1'
          className={clsx(classes.labelStyle, classes.paddingTopS)}>
          Work order status:
        </Typography>
      </Grid>
      <Grid className={classes.detailCtr} item xs={12} sm={9}>
        <FormControl component='fieldset'>
          <Field name='status' component={CustomRadioGroup}>
            {workorderStatus === 'Assigned' ? (
              <FormControlLabel
                value='Assigned'
                control={<Radio color='default' />}
                label='Assigned'
              />
            ) : (
              <FormControlLabel
                value='Work In Progress'
                control={<Radio color='default' />}
                label='In Progress'
              />
            )}
            {workorderTechId === techId && (
              <FormControlLabel
                value='Completed'
                control={<Radio color='default' />}
                label='Completed'
              />
            )}
          </Field>
        </FormControl>
      </Grid>
    </Fragment>
  );
};

WorkOrderStatus.propTypes = {
  workorderStatus: PropTypes.string,
  techId: PropTypes.number,
  workorderTechId: PropTypes.number,
};

export default WorkOrderStatus;

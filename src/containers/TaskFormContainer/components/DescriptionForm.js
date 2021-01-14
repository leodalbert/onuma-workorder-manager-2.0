import React, { Fragment, useMemo } from 'react';
import { Field, FastField } from 'formik';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  TextField,
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
  formControl: {
    [theme.breakpoints.down('md')]: {
      minWidth: 280,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 350,
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
  lableStyleHourSelect: {
    padding: theme.spacing(1),
    fontWeight: 'bolder',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      padding: '6px',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
      paddingTop: 20,
    },
    color: theme.palette.text.primary,
  },
  marginTopS: {
    marginTop: theme.spacing(2),
  },
}));

const CustomSelect = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}>
      {children}
    </Select>
  );
};

const CustomSwitch = ({ form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  // console.count('field');
  return (
    <Switch
      name={name}
      value={value}
      onChange={() => {
        setFieldValue(name, !value);
      }}
    />
  );
};

const CustomTextField = ({ form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      fullWidth
      rows={6}
      id='task-description'
      margin='dense'
      variant='outlined'
      multiline
      rowsMax={8}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    />
  );
};

const renderTechs = (allOtherTechs) => {
  return allOtherTechs.map((tech) => (
    <MenuItem key={tech.id} value={tech.id}>
      {`${tech.first_name} ${tech.last_name} (${tech.email})`}
    </MenuItem>
  ));
};

const DescriptionForm = ({ techId, techName, allOtherTechs }) => {
  const classes = useStyles();

  //   Memoized hours
  const renderHours = useMemo(() => {
    // console.count('hours');
    return _.range(0, 12 + 1).map((value) => (
      <MenuItem key={value} value={value}>
        {value} hrs
      </MenuItem>
    ));
  }, []);

  //   Memoized mins
  const renderMinutes = useMemo(() => {
    // console.count('min');
    return [
      { v: 0, t: 0 },
      { v: 25, t: 15 },
      { v: 5, t: 30 },
      { v: 75, t: 45 },
    ].map((i) => (
      <MenuItem key={i.v} value={i.v}>
        {i.t} mins
      </MenuItem>
    ));
  }, []);

  return (
    <Fragment>
      <Grid className={classes.labelCtr} item xs={12} sm={3}>
        <Typography
          variant='subtitle1'
          className={clsx(classes.labelStyle, classes.marginTopS)}>
          Completed by:
        </Typography>
      </Grid>
      <Grid className={classes.detailCtr} item xs={12} sm={9}>
        <FormControl className={classes.formControl}>
          <Field name='assigned_technician' component={CustomSelect}>
            <MenuItem value={techId}>{techName} (myself)</MenuItem>
            {renderTechs(allOtherTechs)}
          </Field>
        </FormControl>
      </Grid>
      <Grid className={classes.labelCtr} item xs={12} sm={3}>
        <Typography
          variant='subtitle1'
          className={classes.lableStyleHourSelect}>
          Actual hours:
        </Typography>
      </Grid>
      <Grid className={classes.detailCtr} item xs={4} sm={3}>
        <FormControl fullWidth>
          <InputLabel id='hour-select'>Hours</InputLabel>
          <Field component={CustomSelect} name='hrs'>
            {renderHours}
          </Field>
        </FormControl>
      </Grid>
      <Grid className={classes.detailCtr} item xs={4} sm={3}>
        <FormControl fullWidth>
          <InputLabel id='min-select'>Minutes</InputLabel>
          <FastField component={CustomSelect} name='mins'>
            {renderMinutes}
          </FastField>
        </FormControl>
      </Grid>
      <Grid
        style={{ textAlign: 'center' }}
        className={classes.detailCtr}
        item
        xs={4}
        sm={3}>
        <FormControlLabel
          control={<Field component={CustomSwitch} name='is_overtime' />}
          label='Overtime'
        />
      </Grid>
      <Grid className={classes.labelCtr} item xs={12} sm={3}>
        <Typography variant='subtitle1' className={classes.labelStyle}>
          Task description:
        </Typography>
      </Grid>
      <Grid className={classes.detailCtr} item xs={12} sm={9}>
        <FastField component={CustomTextField} name='description' />
      </Grid>
    </Fragment>
  );
};

DescriptionForm.propTypes = {
  techId: PropTypes.number,
  techName: PropTypes.string,
  allOtherTechs: PropTypes.array,
};

export default DescriptionForm;

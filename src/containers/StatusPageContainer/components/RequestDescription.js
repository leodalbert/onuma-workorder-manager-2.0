import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Collapse,
  FormControl,
  TextField,
} from '@material-ui/core';

import { insertBreak } from '../../../utils/HelperFunctions';
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
  paddingTopS: {
    paddingTop: theme.spacing(2),
  },
}));

const RequestDescription = ({
  workorder: { request_description },
  edit,
  newDescription,
  setNewDescription,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.labelCtr} item xs={12} sm={4} lg={5}>
        <Typography variant='subtitle1' className={classes.labelStyle}>
          Request description:
        </Typography>
      </Grid>
      <Grid className={classes.detailCtr} item xs={12} sm={8} lg={7}>
        <Typography variant='body1' className={classes.detailStyle}>
          {request_description &&
            insertBreak(request_description.split('\r\n'))}
        </Typography>
        <Collapse in={edit}>
          <FormControl fullWidth className={classes.paddingTopS}>
            <TextField
              value={newDescription}
              id='location-description'
              label='Add description'
              name='location_description'
              multiline
              rows={4}
              variant='outlined'
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </FormControl>
        </Collapse>
      </Grid>
    </Fragment>
  );
};

RequestDescription.propTypes = {
  edit: PropTypes.bool.isRequired,
  workorder: PropTypes.object,
  newDescription: PropTypes.string.isRequired,
  setNewDescription: PropTypes.func.isRequired,
};

export default RequestDescription;

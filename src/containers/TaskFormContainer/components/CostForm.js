import React, { Fragment } from 'react';
import { Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Grid, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ActionBtn from 'components/Common/ActionBtn';
import NumberFormat from './NumberFormat';

const useStyles = makeStyles((theme) => ({
  btnBreak: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const CustomTextField = ({ form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      label='Description'
      fullWidth
      id='cost-description'
      margin='dense'
      variant='outlined'
      multiline
      rowsMax={3}
    />
  );
};
const CustomCostField = ({ form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      placeholder='Amount'
      fullWidth
      variant='outlined'
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      name={name}
      id='formatted-numberformat-input'
      InputProps={{
        inputComponent: NumberFormat,
        type: 'text',
        startAdornment: <InputAdornment position='start'>$</InputAdornment>,
      }}
    />
  );
};

const CostForm = ({ handleAddCost, formik }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid item xs={12}>
        <Field component={CustomTextField} name='costDescription' />
        <Grid container item xs={12}>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={5}>
              <Field component={CustomCostField} name='cost' />
            </Grid>
            <Grid item xs={12} sm={7} className={classes.btnBreak}>
              <Tooltip
                disableHoverListener={
                  !!formik.values.costDescription && !!formik.values.cost
                }
                enterDelay={500}
                title='Add description and amount to add cost!'
                placement='bottom'>
                <span>
                  <Form>
                    <ActionBtn
                      disabled={
                        !formik.values.costDescription || !formik.values.cost
                      }
                      handleClick={() => handleAddCost({ formik })}>
                      Add Cost
                    </ActionBtn>
                  </Form>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

CostForm.propTypes = {
  handleAddCost: PropTypes.func.isRequired,
  formik: PropTypes.object,
};

export default CostForm;

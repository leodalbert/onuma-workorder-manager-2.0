import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Select, FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  detailSelectCtr: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
    },
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  labelStyleSelect: {
    textAlign: 'left',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },

    '& .MuiFilledInput-input': {
      padding: '8.5px 14px',
      backgroundColor: theme.palette.primary.main,
      boxShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    '& .MuiSelect-select': {
      borderRadius: '4px',
    },
  },
}));

const renderSelectorFields = (filteredComponents) => {
  return _.map(
    filteredComponents,
    ({ component: { id, name, instance_name } }) => (
      <MenuItem key={id} value={{ id, name, instance_name }}>
        {name}
        {instance_name && ` - ${instance_name}`}
      </MenuItem>
    )
  );
};

const ComponentSelector = ({ filteredComponents, handleAddComponent }) => {
  const classes = useStyles();

  const handleSelect = ({ id: componentId }) => {
    handleAddComponent(componentId);
  };

  return (
    <Grid className={classes.detailSelectCtr}>
      <FormControl fullWidth>
        <Select
          disableUnderline
          value={''}
          variant='filled'
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          displayEmpty
          className={classes.labelStyleSelect}
          inputProps={{
            'aria-label': 'Without label',
          }}>
          <MenuItem value='' disabled>
            Add component from current space
          </MenuItem>
          {renderSelectorFields(filteredComponents)}
        </Select>
      </FormControl>
    </Grid>
  );
};

ComponentSelector.propTypes = {
  filteredComponents: PropTypes.array.isRequired,
  handleAddComponent: PropTypes.func.isRequired,
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.filteredComponents === nextProps.filteredComponents;
};
export default memo(ComponentSelector, areEqual);

import React, { Fragment, memo } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Hidden,
  Container,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const WorkorderFilterSelect = ({ filter, dispatch }) => {
  const handleChange = (event) => {
    dispatch({ type: 'setFilter', payload: event.target.value });
  };

  return (
    <Fragment>
      <Hidden xsDown>
        <Container style={{ paddingTop: '20px' }}>
          <FormControl style={{ minWidth: '300px' }}>
            <InputLabel id='filter-label'>Filter Workorders</InputLabel>
            <Select
              labelId='filter-label'
              id='filter'
              value={filter}
              onChange={handleChange}
              label='filter'>
              <MenuItem value={'all'}>
                All (except Archived & Cancelled)
              </MenuItem>
              <MenuItem value={'active'}>
                Active (Active & Work In Progress)
              </MenuItem>
              <MenuItem value={'assigned'}>Assigned</MenuItem>
              <MenuItem value={'work in progress'}>Work In Progress</MenuItem>
              <MenuItem value={'completed'}>Completed</MenuItem>
              <MenuItem value={'cancelled'}>Archived & Cancelled</MenuItem>
              <MenuItem value={'others'}>Others</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </Hidden>
      <Hidden smUp>
        <FormControl variant='filled' fullWidth>
          <InputLabel id='filter-label'>Filter Workorders</InputLabel>
          <Select
            native
            labelId='filter-label'
            id='filter'
            value={filter}
            onChange={handleChange}
            label='filter'>
            <option value={'all'}>All (except Archived & Cancelled)</option>
            <option value={'active'}>Active (Active & Work In Progress)</option>
            <option value={'assigned'}>Assigned</option>
            <option value={'work in progress'}>Work In Progress</option>
            <option value={'completed'}>Completed</option>
            <option value={'cancelled'}>Archived & Cancelled</option>
            <option value={'others'}>Others</option>
          </Select>
        </FormControl>
      </Hidden>
    </Fragment>
  );
};

WorkorderFilterSelect.propTypes = {
  filter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.filter === nextProps.filter;
};
export default memo(WorkorderFilterSelect, areEqual);

import React, { useEffect, Fragment, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';

import DashboardTable from 'containers/DashboardTableContainer.js';
import Spinner from 'components/Common/Spinner';
import WorkorderFilterSelect from 'components/Common/WorkorderFilterSelect';
import { getVisibleWorkorders } from 'utils/HelperFunctions';

const initialFilterState = {
  filter: 'active',
  filteredWorkorders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };
    case 'setFilteredWorkorders':
      return {
        ...state,
        filteredWorkorders: action.payload,
      };
    default:
      throw new Error('Unexpected action');
  }
};

const TechDash = (props) => {
  const {
    clearWorkorderState,
    getAllWorkOrders,
    techId,
    match: {
      params: { studioId, techEmail },
    },
    workorders,
  } = props;
  const [filterReducer, dispatch] = useReducer(reducer, initialFilterState);

  // Clear state from individual workorder
  useEffect(() => {
    clearWorkorderState();
  }, [clearWorkorderState]);

  // get all workorders that are assigned to, or have listed as a collaborator, current tech
  useEffect(() => {
    getAllWorkOrders(techEmail, studioId);
  }, [getAllWorkOrders, techEmail, studioId]);

  useEffect(() => {
    dispatch({
      type: 'setFilteredWorkorders',
      payload: getVisibleWorkorders(workorders, filterReducer.filter),
    });
  }, [workorders, filterReducer.filter]);

  return workorders.length === 0 || !techId ? (
    <Spinner />
  ) : (
    <Fragment>
      <WorkorderFilterSelect
        filter={filterReducer.filter}
        dispatch={dispatch}
      />
      <Container>
        <DashboardTable
          workorders={filterReducer.filteredWorkorders}
          email={techEmail}
          techId={techId}
        />
      </Container>
    </Fragment>
  );
};

TechDash.propTypes = {
  clearWorkorderState: PropTypes.func.isRequired,
  getAllWorkOrders: PropTypes.func.isRequired,
  techId: PropTypes.number,
  match: PropTypes.object.isRequired,
};

export default TechDash;

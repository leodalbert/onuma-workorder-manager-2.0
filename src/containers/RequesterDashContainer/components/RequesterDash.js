import React, { useEffect, Fragment, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';

import DashboardTable from 'containers/DashboardTableContainer.js';
import Spinner from 'components/Common/Spinner';
import WorkorderFilterSelect from 'components/Common/WorkorderFilterSelect';
import { getVisibleWorkorders } from 'utils/HelperFunctions';

const initialFilterState = {
  filter: 'all',
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

const RequesterDash = (props) => {
  const {
    clearWorkorderState,
    getAllWorkOrderRequestsByRequester,
    match: {
      params: { studioId, requesterEmail },
    },
    workorders,
    loading,
  } = props;
  const [filterReducer, dispatch] = useReducer(reducer, initialFilterState);

  // Clear state from individual workorder
  useEffect(() => {
    clearWorkorderState();
  }, [clearWorkorderState]);

  // get all workorders that are assigned to, or have listed as a collaborator, current tech
  useEffect(() => {
    getAllWorkOrderRequestsByRequester(requesterEmail, studioId);
  }, [getAllWorkOrderRequestsByRequester, requesterEmail, studioId]);

  useEffect(() => {
    dispatch({
      type: 'setFilteredWorkorders',
      payload: getVisibleWorkorders(workorders, filterReducer.filter),
    });
  }, [workorders, filterReducer.filter]);

  return loading ? (
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
          requesterEmail={requesterEmail}
          requesterPage={true}
          email={requesterEmail}
        />
      </Container>
    </Fragment>
  );
};

RequesterDash.propTypes = {
  clearWorkorderState: PropTypes.func.isRequired,
  getAllWorkOrderRequestsByRequester: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default RequesterDash;

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Spinner from 'components/Common/Spinner';

const WorkOrder = ({
  match: { params, url },
  setToken,
  getWorkOrderById,
  history,
  workorderId,
}) => {
  // set tech token in state and remove token from url
  useEffect(() => {
    if (params.token) {
      setToken(params.token);
      const location = url.split('/');
      location.pop();
      history.push(location.join('/'));
    }
  }, [setToken, params.token, url]);

  // get workorder from api
  useEffect(() => {
    !workorderId && getWorkOrderById(params.id, params.studioId);
  }, [workorderId, getWorkOrderById, params.id, params.studioId]);

  return (
    <div>
      <div>workorder</div>
    </div>
  );
};

WorkOrder.propTypes = {};

export default WorkOrder;

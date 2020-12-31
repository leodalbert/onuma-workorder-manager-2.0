import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Spinner from 'components/Common/Spinner';

const WorkOrder = ({ match: { params }, getWorkOrderById, workorderId }) => {
  // get workorder
  useEffect(() => {
    !workorderId && getWorkOrderById(params.id, params.studioId);
  }, [workorderId, getWorkOrderById, params.id, params.studioId]);

  console.count('workorder');
  return (
    <div>
      <div>workorder</div>
    </div>
  );
};

WorkOrder.propTypes = {
  match: PropTypes.object.isRequired,
  getWorkOrderById: PropTypes.func.isRequired,
  workorderId: PropTypes.number,
};

export default WorkOrder;

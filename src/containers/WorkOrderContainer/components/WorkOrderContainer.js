import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Common/Spinner';
import WorkOrderAccordion from './WorkOrderAccordion';

const WorkOrder = (props) => {
  const {
    match: { params },
    getWorkOrderById,
    workorderId,
    loading,
    techId,
  } = props;

  //   get workorder
  useEffect(() => {
    !workorderId &&
      getWorkOrderById(params.id, params.studioId, techId, params.techEmail);
  }, [
    workorderId,
    getWorkOrderById,
    params.id,
    params.studioId,
    params.techEmail,
    techId,
  ]);

  return loading ? <Spinner /> : <WorkOrderAccordion {...props} />;
};

WorkOrder.propTypes = {
  match: PropTypes.object.isRequired,
  getWorkOrderById: PropTypes.func.isRequired,
  workorderId: PropTypes.number,
};

export default memo(WorkOrder);

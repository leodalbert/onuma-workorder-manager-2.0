import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Common/Spinner';
import StatusPageWorkorder from './StatusPageWorkorder';

const StatusPage = (props) => {
  const {
    match: {
      params: { id, studioId },
    },
    getRequesterWorkOrder,
    workorderId,
    loading,
  } = props;

  //   get workorder
  useEffect(() => {
    !workorderId && getRequesterWorkOrder(id, studioId);
  }, [workorderId, getRequesterWorkOrder, id, studioId]);
  // TODO - only pass needed props
  return loading ? <Spinner /> : <StatusPageWorkorder {...props} />;
};

StatusPage.propTypes = {
  match: PropTypes.object.isRequired,
  getRequesterWorkOrder: PropTypes.func.isRequired,
  workorderId: PropTypes.number,
  loading: PropTypes.bool.isRequired,
};

export default memo(StatusPage);

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';

const TechDash = ({ setUrlParams, getCurrentTech, match: { params } }) => {
  // set url params to state
  useEffect(() => {
    console.count('setparams');
    setUrlParams({ ...params });
  }, [params, setUrlParams]);

  // API request to get current tech
  useEffect(() => {
    getCurrentTech(params.techEmail, params.studioId);
  }, [params.techEmail, getCurrentTech, params.studioId]);

  return (
    <div>
      {console.count('test')}
      test
    </div>
  );
};

TechDash.propTypes = {
  setUrlParams: PropTypes.func.isRequired,
  getCurrentTech: PropTypes.func.isRequired,
  techEmail: PropTypes.string,
  match: PropTypes.object.isRequired,
};

export default memo(TechDash);

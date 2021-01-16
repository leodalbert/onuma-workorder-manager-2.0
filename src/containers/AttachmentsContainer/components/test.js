import React from 'react';
import PropTypes from 'prop-types';

const test = (props) => {
  console.log(props);
  return <div>test</div>;
};

test.propTypes = {};

export default test;

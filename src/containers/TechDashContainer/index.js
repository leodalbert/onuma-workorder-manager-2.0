// import React from 'react';
import { connect } from 'react-redux';
import TechDash from './components/TechDash';
// import { getCurrentTech } from 'actions/tech';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  // getCurrentTech,
};

const TechDashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TechDash);

export default TechDashContainer;

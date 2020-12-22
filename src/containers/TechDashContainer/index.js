// import React from 'react';
import { connect } from 'react-redux';
import TechDash from './components/TechDash';
import { setUrlParams } from 'actions/urlParams';
import { getCurrentTech } from 'actions/tech';
// import { selectTechEmail, selectStudio } from 'Selectors/urlParams';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setUrlParams,
  getCurrentTech,
};

const TechDashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TechDash);

export default TechDashContainer;

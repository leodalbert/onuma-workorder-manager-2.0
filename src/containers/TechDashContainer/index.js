// import React from 'react';
import { connect } from 'react-redux';
import TechDash from './components/TechDash';
import { clearWorkorderState, getAllWorkOrders } from 'actions/dashboard';
import { selectTechId } from 'Selectors/tech';
import { selectWorkorders } from 'Selectors/dashboard';
// import { getCurrentTech } from 'actions/tech';

const mapStateToProps = (state) => ({
  workorders: selectWorkorders(state),
  techId: selectTechId(state),
});

const mapDispatchToProps = {
  clearWorkorderState,
  getAllWorkOrders,
};

const TechDashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TechDash);

export default TechDashContainer;

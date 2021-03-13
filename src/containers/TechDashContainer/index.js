import { connect } from 'react-redux';
import TechDash from './components/TechDash';
import { clearWorkorderState, getAllWorkOrders } from 'actions/dashboard';
import { selectTechId } from 'Selectors/tech';
import { selectWorkorders, selectDashboardLoading } from 'Selectors/dashboard';

const mapStateToProps = (state) => ({
  workorders: selectWorkorders(state),
  techId: selectTechId(state),
  loading: selectDashboardLoading(state),
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

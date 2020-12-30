import { connect } from 'react-redux';
import WorkOrder from './components/WorkOrder';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const WorkOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkOrder);

export default WorkOrderContainer;

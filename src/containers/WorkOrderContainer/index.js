import { connect } from 'react-redux';
import WorkOrder from './components/WorkOrder';
import { getWorkOrderById } from 'actions/workorder';
import { selectWorkorder, selectWorkorderId } from 'Selectors/workorder';

const mapStateToProps = (state) => ({
  workorder: selectWorkorder(state),
  workorderId: selectWorkorderId(state),
});

const mapDispatchToProps = { getWorkOrderById };

const WorkOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkOrder);

export default WorkOrderContainer;

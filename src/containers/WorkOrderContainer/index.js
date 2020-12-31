import { connect } from 'react-redux';
import WorkOrder from './components/WorkOrder';
import { setToken } from 'actions/auth';
import { getWorkOrderById } from 'actions/workorder';
import { getSpaceComponents } from 'actions/component';
import { selectWorkorder, selectWorkorderId } from 'Selectors/workorder';
import { selectSpaceId } from 'Selectors/space';

const mapStateToProps = (state) => ({
  workorder: selectWorkorder(state),
  workorderId: selectWorkorderId(state),
  spaceId: selectSpaceId(state),
});

const mapDispatchToProps = { setToken, getWorkOrderById, getSpaceComponents };

const WorkOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkOrder);

export default WorkOrderContainer;

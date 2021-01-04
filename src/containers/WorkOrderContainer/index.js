import { connect } from 'react-redux';
import WorkOrderContainer from './components/WorkOrderContainer';
import { getWorkOrderById } from 'actions/workorder';
import {
  selectWorkorderCollaborators,
  selectWorkorderId,
  selectWorkorderLoading,
  makeSelectWorkorder,
} from 'Selectors/workorder';

const mapStateToProps = (state) => ({
  collaborators: selectWorkorderCollaborators(state),
  workorder: makeSelectWorkorder(state),
  workorderId: selectWorkorderId(state),
  loading: selectWorkorderLoading(state),
});

const mapDispatchToProps = { getWorkOrderById };

const WorkOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkOrderContainer);

export default WorkOrder;

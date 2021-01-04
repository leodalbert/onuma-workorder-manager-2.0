import { connect } from 'react-redux';
import WorkOrderContainer from './components/WorkOrderContainer';
import { getWorkOrderById, sendCommentToRequestor } from 'actions/workorder';
import { selectSpace } from 'Selectors/space';
import {
  selectWorkorderCollaborators,
  selectWorkorderId,
  selectWorkorderLoading,
  makeSelectWorkorder,
  makeSelectWorkorderComponents,
} from 'Selectors/workorder';

const mapStateToProps = (state) => ({
  space: selectSpace(state),
  collaborators: selectWorkorderCollaborators(state),
  workorder: makeSelectWorkorder(state),
  workorderId: selectWorkorderId(state),
  components: makeSelectWorkorderComponents(state),
  loading: selectWorkorderLoading(state),
});

const mapDispatchToProps = { getWorkOrderById, sendCommentToRequestor };

const WorkOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkOrderContainer);

export default WorkOrder;

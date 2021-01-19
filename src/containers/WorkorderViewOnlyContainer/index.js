import { connect } from 'react-redux';
import WorkorderViewOnly from './components/WorkOrderContainer';
import { getWorkOrderById, sendCommentToRequestor } from 'actions/workorder';
import { selectSpace } from 'Selectors/space';
import { selectCollaborators } from 'Selectors/collaborators';
import { selectWorkorderTasks } from 'Selectors/task';
import {
  selectWorkorderId,
  selectWorkorderLoading,
  selectWorkorderStatus,
  makeSelectWorkorder,
} from 'Selectors/workorder';
import { selectWorkorderFiles } from 'Selectors/attachments';

const mapStateToProps = (state) => ({
  space: selectSpace(state),
  tasks: selectWorkorderTasks(state),
  collaborators: selectCollaborators(state),
  status: selectWorkorderStatus(state),
  workorder: makeSelectWorkorder(state),
  workorderId: selectWorkorderId(state),
  loading: selectWorkorderLoading(state),
  files: selectWorkorderFiles(state),
});

const mapDispatchToProps = { getWorkOrderById, sendCommentToRequestor };

const WorkOrderViewOnlyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkorderViewOnly);

export default WorkOrderViewOnlyContainer;

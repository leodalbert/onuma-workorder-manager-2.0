import { connect } from 'react-redux';
import WorkOrderContainer from './components/WorkOrderContainer';
import {
  getWorkOrderById,
  sendCommentToRequestor,
  updateWorkorderLocation,
} from 'actions/workorder';
import { selectSpace } from 'Selectors/space';
import { selectCollaborators } from 'Selectors/collaborators';
import { selectTechId } from 'Selectors/tech';
import { selectWorkorderTasks } from 'Selectors/task';
import {
  selectWorkorderId,
  selectWorkorderLoading,
  selectWorkorderStatus,
  makeSelectWorkorder,
  selectSiteBuildings,
} from 'Selectors/workorder';

const mapStateToProps = (state) => ({
  space: selectSpace(state),
  tasks: selectWorkorderTasks(state),
  collaborators: selectCollaborators(state),
  status: selectWorkorderStatus(state),
  workorder: makeSelectWorkorder(state),
  workorderId: selectWorkorderId(state),
  loading: selectWorkorderLoading(state),
  techId: selectTechId(state),
  siteBuidlings: selectSiteBuildings(state),
});

const mapDispatchToProps = {
  getWorkOrderById,
  sendCommentToRequestor,
  updateWorkorderLocation,
};

const WorkOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkOrderContainer);

export default WorkOrder;

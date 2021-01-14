import { connect } from 'react-redux';
import TaskDetails from './components/TaskDetails';
import { selectAllTechs, selectTechId } from 'Selectors/tech';
import {
  selectWorkorderSpaceName,
  selectWorkorderBuildingName,
  selectWorkorderId,
  makeSelectWorkorderTechName,
  selectWorkorderTechId,
  selectWorkorderTechEmail,
} from 'Selectors/workorder';
import {
  selectCollaborators,
  makeSelectVisCollaborators,
  makeSelectAddCollaborators,
} from 'Selectors/collaborators';
import { addNewTask } from 'actions/task';
import { workOrderStatusChange } from 'actions/workorder';
import { addCollaborator, removeCollaborator } from 'actions/collaborator';

const mapStateToProps = (state) => ({
  collaboratorsToAdd: makeSelectAddCollaborators(state),
  techs: selectAllTechs(state),
  techId: selectTechId(state),
  workorderSpaceName: selectWorkorderSpaceName(state),
  workorderBuildingName: selectWorkorderBuildingName(state),
  workorderId: selectWorkorderId(state),
  workorderTechId: selectWorkorderTechId(state),
  workorderTechName: makeSelectWorkorderTechName(state),
  workorderTechEmail: selectWorkorderTechEmail(state),
  workorderCollaborators: selectCollaborators(state),
  visCollaborators: makeSelectVisCollaborators(state),
});

const mapDispatchToProps = {
  addNewTask,
  workOrderStatusChange,
  addCollaborator,
  removeCollaborator,
};

const TaskDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetails);

export default TaskDetailsContainer;

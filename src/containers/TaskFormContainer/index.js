import { connect } from 'react-redux';
import TaskForm from './components/TaskForm';
import {
  selectTechName,
  selectTechId,
  makeSelectAllOtherTechs,
} from 'Selectors/tech';
import {
  selectWorkorderId,
  selectWorkorderStatus,
  selectWorkorderTechId,
  makeSelectWorkorderTechName,
} from 'Selectors/workorder';
import { addNewTask } from 'actions/task';

const mapStateToProps = (state) => ({
  workorderStatus: selectWorkorderStatus(state),
  workorderId: selectWorkorderId(state),
  workorderTechId: selectWorkorderTechId(state),
  workorderTechName: makeSelectWorkorderTechName(state),
  techId: selectTechId(state),
  techName: selectTechName(state),
  allOtherTechs: makeSelectAllOtherTechs(state),
});

const mapDispatchToProps = { addNewTask };

const TaskDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);

export default TaskDetailsContainer;

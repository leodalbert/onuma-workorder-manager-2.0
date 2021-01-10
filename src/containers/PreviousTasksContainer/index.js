import { connect } from 'react-redux';
import PreviousTasks from './components/PreviousTasks';
import {
  makeSelectWorkorderTasks,
  makeSelectWorkorderTaskCosts,
} from 'Selectors/task';
import { selectAllTechs } from 'Selectors/tech';
import { getTaskCosts } from 'actions/task';

const mapStateToProps = (state) => ({
  tasks: makeSelectWorkorderTasks(state),
  techs: selectAllTechs(state),
  taskCosts: makeSelectWorkorderTaskCosts(state),
});

const mapDispatchToProps = { getTaskCosts };

const PreviousTasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousTasks);

export default PreviousTasksContainer;

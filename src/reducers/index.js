import { combineReducers } from 'redux';
import auth from './auth';
import components from './components';
import task from './task';
import tech from './tech';
import workorder from './workOrder';
import space from './space';
import componentDialog from './componentDialog';
import collaborator from './collaborator';

export default combineReducers({
  auth,
  components,
  task,
  tech,
  collaborator,
  workorder,
  space,
  componentDialog,
});

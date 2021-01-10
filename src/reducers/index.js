import { combineReducers } from 'redux';
import auth from './auth';
import components from './components';
import task from './task';
import tech from './tech';
import workorder from './workOrder';
import space from './space';
import componentDialog from './componentDialog';

export default combineReducers({
  auth,
  components,
  task,
  tech,
  workorder,
  space,
  componentDialog,
});

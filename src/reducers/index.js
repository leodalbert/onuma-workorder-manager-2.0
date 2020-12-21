import { combineReducers } from 'redux';
import auth from './auth';
import components from './components';
import task from './task';
import tech from './tech';
import workOrder from './workOrder';

export default combineReducers({
  auth,
  components,
  task,
  tech,
  workOrder,
});

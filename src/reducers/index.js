import { combineReducers } from 'redux';
import auth from './auth';
import components from './components';
import task from './task';
import tech from './tech';
import workorder from './workOrder';
import space from './space';
import componentDialog from './componentDialog';
import collaborator from './collaborator';
import attachments from './attachments';
import dashboard from './dashboard';

export default combineReducers({
  auth,
  components,
  task,
  tech,
  collaborator,
  attachments,
  workorder,
  space,
  dashboard,
  componentDialog,
});

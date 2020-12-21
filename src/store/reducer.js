import { combineReducers } from 'redux';
import auth from 'containers/AuthContainer/meta/reducer';
import components from 'containers/ComponentsContainer/meta/reducer';
import header from 'containers/HeaderContainer/meta/reducer';
import statusDash from 'containers/StatusDashContainer/meta/reducer';
import statusPage from 'containers/StatusPageContainer/meta/reducer';
import task from 'containers/TaskContainer/meta/reducer';
import tech from 'containers/TechContainer/meta/reducer';
import techDash from 'containers/TechDashContainer/meta/reducer';
import workOrder from 'containers/WorkOrderContainer/meta/reducer';

export default combineReducers({
  auth,
  components,
  header,
  statusDash,
  statusPage,
  task,
  tech,
  techDash,
  workOrder,
});

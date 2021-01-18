import { connect } from 'react-redux';
import RequesterDash from './components/RequesterDash';
import {
  clearWorkorderState,
  getAllWorkOrderRequestsByRequester,
} from 'actions/dashboard';
import { selectRequesterWorkorders } from 'Selectors/dashboard';

const mapStateToProps = (state) => ({
  workorders: selectRequesterWorkorders(state),
});

const mapDispatchToProps = {
  clearWorkorderState,
  getAllWorkOrderRequestsByRequester,
};

const RequesterDashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequesterDash);

export default RequesterDashContainer;

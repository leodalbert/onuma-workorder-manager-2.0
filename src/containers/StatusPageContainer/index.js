import { connect } from 'react-redux';
import StatusPage from './components/StatusPage';
import {
  getRequesterWorkOrder,
  updateWorkorder,
  setStatus,
} from 'actions/workorder';
import { selectSpace } from 'Selectors/space';
import { selectAuthUser } from 'Selectors/auth';
import {
  selectWorkorderId,
  selectWorkorderLoading,
  selectWorkorderStatus,
  makeSelectWorkorder,
  selectRequestEmail,
  selectSiteBuildings,
} from 'Selectors/workorder';

const mapStateToProps = (state) => ({
  status: selectWorkorderStatus(state),
  workorder: makeSelectWorkorder(state),
  workorderId: selectWorkorderId(state),
  loading: selectWorkorderLoading(state),
  spaceInfo: selectSpace(state),
  user: selectAuthUser(state),
  requestEmail: selectRequestEmail(state),
  siteBuidlings: selectSiteBuildings(state),
});

const mapDispatchToProps = {
  getRequesterWorkOrder,
  updateWorkorder,
  setStatus,
};

const StatusPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusPage);

export default StatusPageContainer;

import { connect } from 'react-redux';
import DashboardTable from './components/DashboardTable';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const DashboardTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardTable);

export default DashboardTableContainer;

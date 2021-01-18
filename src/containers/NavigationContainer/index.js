import { connect } from 'react-redux';
import Navigation from './components/Navigation';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

export default NavigationContainer;

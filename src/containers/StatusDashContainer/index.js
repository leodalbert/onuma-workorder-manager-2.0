import React from 'react';
import { connect } from 'react-redux';
import StatusDash from './components/StatusDash';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const StatusDashContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StatusDash);

export default StatusDashContainer;

import React from 'react';
import { connect } from 'react-redux';
import StatusPage from './components/StatusPage';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const StatusPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StatusPage);

export default StatusPageContainer;

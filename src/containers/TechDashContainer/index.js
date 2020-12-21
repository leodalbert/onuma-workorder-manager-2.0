import React from 'react';
import { connect } from 'react-redux';
import TechDash from './components/TechDash';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const TechDashContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TechDash);

export default TechDashContainer;

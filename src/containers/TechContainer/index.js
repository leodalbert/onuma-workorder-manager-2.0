import React from 'react';
import { connect } from 'react-redux';
import Tech from './components/Tech';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const TechContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tech);

export default TechContainer;

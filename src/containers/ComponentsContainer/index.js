import React from 'react';
import { connect } from 'react-redux';
import Components from './components/Components';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const ComponentsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Components);

export default ComponentsContainer;

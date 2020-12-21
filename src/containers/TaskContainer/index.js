import React from 'react';
import { connect } from 'react-redux';
import Task from './components/Task';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const TaskContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Task);

export default TaskContainer;

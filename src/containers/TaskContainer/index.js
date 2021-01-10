import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Task from './components/Task';
import { makeSelectWorkorder2 } from 'Selectors/workorder';

// const mapStateToProps = (state) => ({
//   workorder: makeSelectWorkorder2(state),
// });

const mapStateToProps = createStructuredSelector({
  workorder: makeSelectWorkorder2(),
});

const mapDispatchToProps = {};

const TaskContainer = connect(mapStateToProps, mapDispatchToProps)(Task);

export default TaskContainer;

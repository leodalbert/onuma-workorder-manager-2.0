import { initialState } from 'reducers/task';
import { createSelector } from 'reselect';
/**
 * Get Tasks
 * @param state
 * @returns {Object}
 */
export const selectTask = (state) => state.task || initialState;

export const selectWorkorderTasks = (state) => selectTask(state).workorderTasks;
export const makeSelectWorkorderTasks = createSelector(
  selectTask,
  (task) => task.workorderTasks
);

export const makeSelectWorkorderTaskCosts = createSelector(
  selectTask,
  (task) => task.taskCosts
);

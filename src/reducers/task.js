import produce from 'immer';
import {
  GET_TASK_COSTS,
  ADD_COST,
  ADD_TASK,
  GET_WORKORDER,
  UPDATE_WORKORDER_TASK,
  CLEAR_WORKORDER_STATE,
} from 'actions/types';

export const initialState = {
  taskCosts: [],
  workorderTasks: [],
};

/* eslint-disable no-param-reassign */
const Task = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case GET_WORKORDER:
        draft.workorderTasks = payload.tasks;
        break;
      case UPDATE_WORKORDER_TASK:
        draft.workorderTasks = draft.workorderTasks.map((task) => {
          if (task.id === payload.id) {
            return payload;
          } else {
            return task;
          }
        });
        break;
      case GET_TASK_COSTS:
        draft.taskCosts = payload;
        break;
      case ADD_COST:
        draft.taskCosts.push(payload);
        break;
      case ADD_TASK:
        draft.workorderTasks.push(payload);
        break;
      case CLEAR_WORKORDER_STATE:
        return { ...initialState };
      default:
        break;
    }
  });

export default Task;

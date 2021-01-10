import network from 'utils/network';
import {
  GET_TASK_COSTS,
  ADD_COST,
  ADD_TASK,
  LOGIN_FAIL,
  UPDATE_WORKORDER_TASK,
} from 'actions/types';

// Get All task costs for workorder
export const getTaskCosts = (studioId, tasks) => async (dispatch) => {
  try {
    const res = await network.getTaskCosts(studioId, tasks);
    dispatch({ type: GET_TASK_COSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Post new task for workorder
export const addNewTask = (taskForm, costs, studioId) => async (dispatch) => {
  try {
    const res = await network.addNewTask(taskForm, studioId);
    if (costs.length > 0) {
      costs.map((cost) => {
        return dispatch(addNewCost(cost, res.data.id, studioId));
      });
    }
    dispatch({ type: ADD_TASK, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Post new cost for workorder and update state
export const addNewCost = (cost, taskId, studioId) => async (dispatch) => {
  try {
    const res = await network.addNewCost(cost, taskId, studioId);

    dispatch(updateWorkorderTask(studioId, taskId));

    dispatch({ type: ADD_COST, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Update Workorder Task
export const updateWorkorderTask = (studioId, taskId) => async (dispatch) => {
  try {
    const res = await network.updateWorkorderTask(studioId, taskId);
    dispatch({ type: UPDATE_WORKORDER_TASK, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

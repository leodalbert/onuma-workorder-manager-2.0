import {
  LOGIN_FAIL,
  SET_DASH_LOADING,
  GET_TECHS_WORK_ORDERS,
  CLEAR_WORKORDER_STATE,
  GET_REQUESTER_WORK_ORDERS,
} from './types';
import network from 'utils/network';

// Get all work orders by tech Id
export const getAllWorkOrders = (techId, studioId) => async (dispatch) => {
  dispatch({ type: SET_DASH_LOADING });
  try {
    const res = await network.getAllWorkordersByTech(techId, studioId);
    dispatch({ type: GET_TECHS_WORK_ORDERS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Get all work orders by request_email
export const getAllWorkOrderRequestsByRequester = (
  requestEmail,
  studioId
) => async (dispatch) => {
  try {
    const res = await network.getAllWorkOrderRequestsByRequester(
      requestEmail,
      studioId
    );
    const resCc = await network.getAllWorkOrderRequestsByRequesterCC(
      requestEmail,
      studioId
    );
    dispatch({
      type: GET_REQUESTER_WORK_ORDERS,
      payload: [...res.data, ...resCc.data],
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Clear workorder state
export const clearWorkorderState = () => ({ type: CLEAR_WORKORDER_STATE });

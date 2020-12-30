import network from 'utils/network';
import { GET_WORKORDER_TECH, ERROR } from 'actions/types';

// Get Work order tech for auth
export const getTechForAuth = (workorderId, studioId) => async (dispatch) => {
  try {
    const res = await network.getTechForAuth(workorderId, studioId);
    dispatch({ type: GET_WORKORDER_TECH, payload: res.data });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        msg: err.response.data.err.message,
        status: err.response.data.err.code,
      },
    });
  }
};

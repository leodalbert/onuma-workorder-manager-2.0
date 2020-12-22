import { CURRENT_TECH, ERROR } from './types';
import network from 'utils/network';

// get current tech by Email
export const getCurrentTech = (techEmail, studio) => async (dispatch) => {
  console.log(techEmail);
  try {
    const res = await network.getCurrentTech(techEmail, studio);
    console.log(res.data);
    if (res.data && res.data.length === 0) {
      dispatch({
        type: ERROR,
        payload: {
          msg: `No technician found with email address: ${techEmail}`,
          status: 404,
        },
      });
    } else {
      let payload;
      if (res.data) {
        payload = res.data[0];
        dispatch({ type: CURRENT_TECH, payload });
      }
    }
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

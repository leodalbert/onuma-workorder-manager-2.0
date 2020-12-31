import { CURRENT_TECH, LOGIN_FAIL } from './types';
import network from 'utils/network';

// get current tech by Email
export const getCurrentTech = (techEmail, studio) => async (dispatch) => {
  try {
    const res = await network.getCurrentTech(techEmail, studio);
    if (res.data && res.data.length === 0) {
      dispatch({ type: LOGIN_FAIL });
    } else {
      let payload;
      if (res.data) {
        payload = res.data[0];
        dispatch({ type: CURRENT_TECH, payload });
      }
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

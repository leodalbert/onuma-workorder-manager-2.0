import { CURRENT_TECH, LOGIN_FAIL, GET_TECHS, SET_TECH } from './types';
import network from 'utils/network';

// get current tech by tech Email
export const getCurrentTech = (techEmail, studio) => async (dispatch) => {
  try {
    const res = await network.getCurrentTech(techEmail, studio);
    if (res.data && res.data.length === 0) {
      dispatch({ type: LOGIN_FAIL });
    } else {
      let payload;
      if (res.data) {
        payload = res.data[0];
        dispatch(getAllTechs(studio, res.data[0].site_group.id));
        dispatch({ type: CURRENT_TECH, payload });
      }
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

//  get all techs in site_group
export const getAllTechs = (studioId, siteGroup) => async (dispatch) => {
  try {
    const res = await network.getAllTechs(studioId, siteGroup);
    dispatch({ type: GET_TECHS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const setTechId = (studioId, id, siteGroup) => (dispatch) => {
  try {
    dispatch({ type: SET_TECH, payload: { id, siteGroup } });
    dispatch(getAllTechs(studioId, siteGroup));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

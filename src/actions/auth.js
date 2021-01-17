import network from 'utils/network';
import Cookies from 'js-cookie';
import { getCurrentTech } from 'actions/tech';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_AUTH_TOKEN,
  AUTH_LOADING,
  REDIRECT,
  CLEAR_WORKORDER_STATE,
} from './types';

// log out user and destroy cookie
export const logout = () => async (dispatch) => {
  await network.logout();
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_WORKORDER_STATE });
};

// set token from url
export const setToken = (token) => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

// refresh token
export const sessionResume = (studioId, email, token) => async (dispatch) => {
  try {
    await network.refreshSession(studioId, email, token);
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// start cookie session
export const sessionLogin = (
  studioId,
  email,
  token,
  pathname,
  workorder,
  isTech
) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  try {
    if (isTech) {
      const res = await network.startSession(token, email, studioId);

      // get current tech and all techs in siteGroup if tech workorder
      dispatch(getCurrentTech(email, studioId));

      if (res.request.responseURL.includes('login')) {
        dispatch({ type: REDIRECT, payload: pathname });
      } else {
        Cookies.set('onumaLocal', btoa(JSON.stringify({ email, token })));
        dispatch({ type: LOGIN_SUCCESS, payload: email });
      }
    } else {
      const res = await network.startRequesterSession(
        token,
        email,
        studioId,
        workorder
      );

      if (res.request.responseURL.includes('login')) {
        dispatch({ type: REDIRECT, payload: pathname });
      } else {
        Cookies.set('onumaLocal', btoa(JSON.stringify({ email, token })));
        dispatch({ type: LOGIN_SUCCESS, payload: email });
      }
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

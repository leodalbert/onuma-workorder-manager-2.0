import produce from 'immer';
import Cookies from 'js-cookie';
import {
  SET_AUTH_TOKEN,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  AUTH_LOADING,
  REDIRECT,
} from 'actions/types';

export const initialState = {
  token: '',
  isAuthenticated: false,
  authLoading: true,
  user: '',
  redirect: '',
};

/* eslint-disable no-param-reassign */
const Auth = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case SET_AUTH_TOKEN:
        draft.token = payload;
        break;
      case LOGIN_SUCCESS:
        draft.isAuthenticated = true;
        draft.user = payload;
        draft.authLoading = false;
        draft.redirect = '';
        break;
      case LOGOUT:
      case LOGIN_FAIL:
        Cookies.remove('onumaLocal');
        draft.isAuthenticated = false;
        draft.user = '';
        draft.authLoading = false;
        draft.redirect = '';
        break;
      case AUTH_LOADING:
        draft.authLoading = true;
        break;
      case REDIRECT:
        draft.redirect = payload;
        break;
      default:
        break;
    }
  });

export default Auth;

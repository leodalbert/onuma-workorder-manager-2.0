import produce from 'immer';
import {
  CURRENT_TECH,
  GET_TECHS,
  SET_TECH,
  LOGIN_FAIL,
  LOGOUT,
} from 'actions/types';

export const initialState = {
  techs: [],
  siteGroup: undefined,
  email: '',
  name: '',
  id: undefined,
  token: undefined,
};

/* eslint-disable no-param-reassign */
const Tech = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case CURRENT_TECH:
        draft.email = payload.email;
        draft.name = payload.first_name + ' ' + payload.last_name;
        draft.siteGroup = Number(payload.site_group.id);
        draft.id = Number(payload.id);
        draft.token = payload.token;
        break;
      case GET_TECHS:
        draft.techs = payload;
        break;
      case SET_TECH:
        draft.id = payload.id;
        draft.siteGroup = payload.siteGroup;
        break;
      case LOGIN_FAIL:
      case LOGOUT:
        draft.id = 404;
        break;
      default:
        break;
    }
  });

export default Tech;

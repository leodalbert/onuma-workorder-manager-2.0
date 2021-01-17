import produce from 'immer';
import {
  SET_SPACE_INFO,
  SET_SPACE_FLOOR_ID,
  CLEAR_WORKORDER_STATE,
} from 'actions/types';

export const initialState = {
  siteId: undefined,
  buildingId: undefined,
  floorId: 0,
  spaceId: undefined,
  spaceName: '',
};

/* eslint-disable no-param-reassign */
const space = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case SET_SPACE_INFO:
        return {
          ...state,
          ...payload,
        };
      case SET_SPACE_FLOOR_ID:
        draft.floorId = payload.floorId;
        break;
      case CLEAR_WORKORDER_STATE:
        return { ...initialState };
      default:
        break;
    }
  });

export default space;

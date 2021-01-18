import produce from 'immer';
import {
  GET_TECHS_WORK_ORDERS,
  GET_REQUESTER_WORK_ORDERS,
} from 'actions/types';

export const initialState = {
  workorders: [],
  requesterWorkorders: [],
};

/* eslint-disable no-param-reassign */
const Tech = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case GET_TECHS_WORK_ORDERS:
        draft.workorders = payload;
        break;
      case GET_REQUESTER_WORK_ORDERS:
        draft.requesterWorkorders = payload;
        break;
      default:
        break;
    }
  });

export default Tech;

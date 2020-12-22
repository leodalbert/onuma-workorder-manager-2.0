import { URL_PARAMS } from 'actions/types';

export const initialState = {
  studioId: undefined,
  techEmail: '',
  workorderId: '',
};

const urlParams = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case URL_PARAMS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default urlParams;

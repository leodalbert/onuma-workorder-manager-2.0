import produce from 'immer';
import { GET_SPACE_COMPONENTS } from 'actions/types';

export const initialState = {
  spaceComponents: [],
};

/* eslint-disable no-param-reassign */
const Components = (state = initialState, action) =>
  produce(state, (draft) => {
    const { payload, type } = action;
    switch (type) {
      case GET_SPACE_COMPONENTS:
        draft.spaceComponents = payload;
        break;
      default:
        break;
    }
  });

export default Components;

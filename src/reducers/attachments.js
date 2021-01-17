import produce from 'immer';
import {
  DELETE_ATTACHMENT,
  GET_WORKORDER_FILES,
  ADD_WORKORDER_FILE,
  CLEAR_WORKORDER_STATE,
} from 'actions/types';

export const initialState = {
  files: [],
};

/* eslint-disable no-param-reassign */
const attachments = (state = initialState, action) =>
  produce(state, (draft) => {
    const { payload, type } = action;
    switch (type) {
      case GET_WORKORDER_FILES:
        draft.files = payload;
        break;
      case ADD_WORKORDER_FILE:
        draft.files.push(payload);
        break;
      case DELETE_ATTACHMENT:
        draft.files = draft.files.filter((file) => file.id !== payload);
        break;
      case CLEAR_WORKORDER_STATE:
        draft.files = initialState.files;
        break;
      default:
        break;
    }
  });

export default attachments;

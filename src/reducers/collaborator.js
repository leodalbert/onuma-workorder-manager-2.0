import produce from 'immer';
import {
  GET_WORKORDER,
  ADD_COLLABORATOR,
  REMOVE_COLLABORATOR,
} from 'actions/types';

export const initialState = {
  collaborators: [],
};

/* eslint-disable no-param-reassign */
const Tech = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case GET_WORKORDER:
        draft.collaborators = payload.collaborators;
        break;
      case ADD_COLLABORATOR:
        draft.collaborators.push(payload);
        break;
      case REMOVE_COLLABORATOR:
        draft.collaborators = draft.collaborators.filter(
          (collaborator) => collaborator.id !== payload
        );
        break;
      default:
        break;
    }
  });

export default Tech;

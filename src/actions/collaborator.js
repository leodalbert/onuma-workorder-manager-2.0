import network from 'utils/network';

import {
  ADD_COLLABORATOR,
  REMOVE_COLLABORATOR,
  LOGIN_FAIL,
} from 'actions/types';

// Post new collaborator to workorder
export const addCollaborator = (workorderId, techId, studioId) => async (
  dispatch
) => {
  try {
    const res = await network.addCollaborator(workorderId, techId, studioId);
    const data = res.data;
    let payload = {
      id: data.id,
      collaborator: {
        id: data.collaborator,
      },
    };

    dispatch({ type: ADD_COLLABORATOR, payload });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Remove Collaborator
export const removeCollaborator = (collaboratorId, studioId) => async (
  dispatch
) => {
  try {
    await network.removeCollaborator(collaboratorId, studioId);
    dispatch({ type: REMOVE_COLLABORATOR, payload: collaboratorId });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

import network from 'utils/network';
import { patchWorkorderWithFile } from 'actions/workorder';
import {
  DELETE_ATTACHMENT,
  LOGIN_FAIL,
  ADD_WORKORDER_FILE,
} from 'actions/types';

export const deleteAttachment = (id, studioId) => async (dispatch) => {
  try {
    await network.deleteAttachment(id, studioId);
    dispatch({ type: DELETE_ATTACHMENT, payload: id });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const uploadFile = (data, studioId, workorderId, techId) => async (
  dispatch
) => {
  try {
    const res = await network.uploadFile(data, studioId, techId);
    dispatch(patchWorkorderWithFile(res.data.id, studioId, workorderId));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// GET directus_file data for new record
export const getFileInfo = (studioId, fileWorkorderId) => async (dispatch) => {
  try {
    const res = await network.getFileInfo(studioId, fileWorkorderId);
    dispatch({ type: ADD_WORKORDER_FILE, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

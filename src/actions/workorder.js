import network from 'utils/network';
import {
  getSpaceComponents,
  getInitialWorkOrderComponentDetails,
} from 'actions/component';
import { getFileInfo } from 'actions/attachments';
import {
  GET_WORKORDER,
  GET_WORKORDER_FILES,
  LOGIN_FAIL,
  SET_SPACE_INFO,
  SET_SPACE_FLOOR_ID,
  SEND_COMMENT_TO_REQUESTOR,
  CHANGE_WORKORDER_STATUS,
} from 'actions/types';

// Get floor 0 id of building
export const getFloorId = (buildingId, studioId) => async (dispatch) => {
  try {
    const res = await network.getFloor0Id(buildingId, studioId);
    dispatch({
      type: SET_SPACE_FLOOR_ID,
      payload: { floorId: res.data[0].floors[0].id },
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Get technician page Work order by work order Id
export const getWorkOrderById = (workorderId, studioId) => async (dispatch) => {
  try {
    const res = await network.getWorkorderById(workorderId, studioId);
    let workorder = res.data;

    // get details of components in workorder
    if (workorder.components.length > 0) {
      dispatch(
        getInitialWorkOrderComponentDetails(workorder.components, studioId)
      );
    }

    // create object with buidling info if availible
    let buildingInfo = {};
    buildingInfo.siteId = workorder.building.site;
    buildingInfo.buildingId = workorder.building.id;

    if (workorder.space) {
      buildingInfo.spaceId = workorder.space.id;
      buildingInfo.spaceName = workorder.space.name;
      // get space components if there is a spaceId
      dispatch(getSpaceComponents(workorder.space.id, studioId));
    }
    if (workorder.floor) {
      buildingInfo.floorId = workorder.floor.id;
    } else {
      dispatch(getFloorId(buildingInfo.buildingId, studioId));
    }
    dispatch({ type: SET_SPACE_INFO, payload: buildingInfo });

    dispatch(getWorkorderFiles(workorderId, studioId));
    dispatch({ type: GET_WORKORDER, payload: workorder });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Get all files attached to work order
export const getWorkorderFiles = (workorderId, studioId) => async (
  dispatch
) => {
  try {
    const res = await network.getWorkorderFiles(workorderId, studioId);
    dispatch({ type: GET_WORKORDER_FILES, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Patch Workorder with new comment to requestor
export const sendCommentToRequestor = (
  comment,
  studioId,
  workorderId
) => async (dispatch) => {
  try {
    const res = await network.sendCommentToRequestor(
      comment,
      studioId,
      workorderId
    );

    dispatch({
      type: SEND_COMMENT_TO_REQUESTOR,
      payload: res.data.administrator_comment,
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Patch work order status Change
export const workOrderStatusChange = (workorderId, status, studioId) => async (
  dispatch
) => {
  try {
    const res = await network.workOrderStatusChange(
      (workorderId, status, studioId)
    );
    dispatch({ type: CHANGE_WORKORDER_STATUS, payload: res.data.status });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Post new workorder_directus_files record with new directus_files record
export const patchWorkorderWithFile = (id, studioId, workorderId) => async (
  dispatch
) => {
  try {
    const res = await network.patchWorkorderWithFile(id, studioId, workorderId);
    dispatch(getFileInfo(studioId, res.data.id));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

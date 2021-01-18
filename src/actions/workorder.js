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
  GET_ALL_SPACES,
  SET_WORKORDER_LOADING,
  SET_STATUS,
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
    if (workorder.location_description) {
      buildingInfo.location_description = workorder.location_description;
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
// Get requester page Work order by work order Id
export const getRequesterWorkOrder = (workorderId, studioId) => async (
  dispatch
) => {
  try {
    const res = await network.getWorkOrderStatusDetails(workorderId, studioId);
    let workorder = res.data;

    // create object with buidling info if availible
    let buildingInfo = {};
    buildingInfo.siteId = workorder.building.site;
    buildingInfo.buildingId = workorder.building.id;

    if (workorder.space) {
      buildingInfo.spaceId = workorder.space.id;
      buildingInfo.spaceName = workorder.space.name;
      buildingInfo.spaceNumber = workorder.space.number;
    }
    if (workorder.location_description) {
      buildingInfo.location_description = workorder.location_description;
    }
    if (workorder.floor) {
      buildingInfo.floorId = workorder.floor.id;
      buildingInfo.floorName = workorder.floor.name;
      buildingInfo.floorNumber = workorder.floor.number;
    } else {
      dispatch(getFloorId(buildingInfo.buildingId, studioId));
    }
    dispatch(getAllSpaces(buildingInfo.siteId, studioId));
    dispatch({ type: SET_SPACE_INFO, payload: buildingInfo });

    dispatch({ type: GET_WORKORDER, payload: workorder });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// patch workorker location and request description updates
export const updateWorkorder = (studioId, workorderId, updatedObj) => async (
  dispatch
) => {
  dispatch(setWorkorderLoading());
  try {
    const res = await network.updateStatusPageWorkorder(
      studioId,
      workorderId,
      updatedObj
    );
    const workorder = res.data;
    // create object with buidling info if availible
    let buildingInfo = {};
    buildingInfo.siteId = workorder.building.site;
    buildingInfo.buildingId = workorder.building.id;
    buildingInfo.buildingName = workorder.building.name;

    if (workorder.space) {
      buildingInfo.spaceId = workorder.space.id;
      buildingInfo.spaceName = workorder.space.name;
      buildingInfo.spaceNumber = workorder.space.number;
    }
    if (workorder.location_description) {
      buildingInfo.location_description = workorder.location_description;
    }
    if (workorder.floor) {
      buildingInfo.floorId = workorder.floor.id;
      buildingInfo.floorName = workorder.floor.name;
      buildingInfo.floorNumber = workorder.floor.number;
    } else {
      dispatch(getFloorId(buildingInfo.buildingId, studioId));
    }
    dispatch({ type: SET_SPACE_INFO, payload: buildingInfo });

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
      workorderId,
      status,
      studioId
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

// Get spaces by site
export const getAllSpaces = (siteId, studioId) => async (dispatch) => {
  try {
    const res = await network.getAllSpaces(siteId, studioId);
    dispatch({
      type: GET_ALL_SPACES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Patch work order status Change with optional confirmation decline text
export const setStatus = (workorderId, statusObj, studioId) => async (
  dispatch
) => {
  try {
    dispatch({ type: SET_STATUS, payload: statusObj.status });
    await network.setStatus(workorderId, statusObj, studioId);
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// set workorder loading
export const setWorkorderLoading = () => ({ type: SET_WORKORDER_LOADING });

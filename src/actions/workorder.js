import network from 'utils/network';
import { getSpaceComponents } from 'actions/component';
import {
  GET_WORKORDER,
  GET_WORKORDER_FILES,
  LOGIN_FAIL,
  SET_SPACE_INFO,
  SET_SPACE_FLOOR_ID,
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
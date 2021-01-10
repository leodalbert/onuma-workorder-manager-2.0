import network from 'utils/network';
import {
  GET_SPACE_COMPONENTS,
  LOGIN_FAIL,
  GET_COMPONENT_LINKS,
  SET_COMPONENT_LOADING,
  GET_WORK_ORDER_COMPONENTS,
  FILL_DIALOG_COMPONENT,
  CLEAR_DIALOG_COMPONENT,
  CLEAR_SEARCH_STATE,
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  SEARCH_COMPONENTS,
  SEARCH_LOADING,
} from 'actions/types';

export const getSpaceComponents = (spaceId, studioId) => async (dispatch) => {
  try {
    const res = await network.getSpaceComponents(spaceId, studioId);
    dispatch({ type: GET_SPACE_COMPONENTS, payload: res.data.components });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Get details for work order components by component id and append instanceId
export const getWorkOrderComponentDetails = (
  componentId,
  instanceId,
  studioId
) => async (dispatch) => {
  try {
    const res = await network.getWorkOrderComponentDetails(
      componentId,
      studioId
    );
    let data = res.data;
    data.space = data.space_component;
    data.instanceId = instanceId;
    dispatch({ type: SET_COMPONENT_LOADING, payload: false });
    dispatch({ type: GET_WORK_ORDER_COMPONENTS, payload: data });
    dispatch(getComponentFiles(componentId, studioId));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Get initial details for work order components by array of components
// TODO switch all component detail requests to this format
export const getInitialWorkOrderComponentDetails = (
  components,
  studioId
) => async (dispatch) => {
  let componentData = [];
  try {
    // Todo change this to axios.all
    for (const component of components) {
      const res = await network.getWorkOrderComponentDetails(
        component.component,
        studioId
      );
      let data = res.data;
      data.space = data.space_component;
      data.instanceId = component.id;
      componentData.push(data);
      // TODO switch componet file request to a swingle action
      dispatch(getComponentFiles(component.component, studioId));
    }
    dispatch({ type: GET_WORK_ORDER_COMPONENTS, payload: componentData });
    dispatch({ type: SET_COMPONENT_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Get component Attachments
export const getComponentFiles = (componentId, studioId) => async (
  dispatch
) => {
  try {
    const res = await network.getComponentFiles(componentId, studioId);
    let parser = new DOMParser();
    let links = [];
    let doc = parser.parseFromString(res, 'text/html');
    doc.querySelectorAll('.attachment-documents-container a').forEach((a) => {
      if (a.querySelector('img')) {
        links.push({
          type: 'img',
          thumbnail: a.querySelector('img').src,
          url: a.href,
        });
      } else {
        links.push({ type: 'file', url: a.href, text: a.textContent });
      }
    });
    if (links.length > 0) {
      dispatch({
        type: GET_COMPONENT_LINKS,
        payload: { componentId: componentId, links: links },
      });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Post component to work order
export const addComponent = (componentId, workorderId, studioId) => async (
  dispatch
) => {
  dispatch({ type: SET_COMPONENT_LOADING, payload: true });
  try {
    const res = await network.addComponent(componentId, workorderId, studioId);

    // object with component instance and type id
    const componentIds = {
      id: res.data.id,
      component: res.data.component,
    };

    // get details and add button on component page
    dispatch(getInitialWorkOrderComponentDetails([componentIds], studioId));

    // add component to workorder state
    dispatch({
      type: ADD_COMPONENT,
      payload: componentIds,
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Delete component from work order
export const removeComponent = (componentWorkorderId, studioId) => async (
  dispatch
) => {
  dispatch({ type: REMOVE_COMPONENT, payload: componentWorkorderId });
  try {
    await network.removeComponent(componentWorkorderId, studioId);
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Get all components in bulding by search criteria
export const searchComponents = (searchParam, buildingId, studioId) => async (
  dispatch
) => {
  dispatch({ type: SEARCH_LOADING });
  try {
    const res = await network.searchComponents(
      searchParam,
      buildingId,
      studioId
    );

    // refractor data from backend change
    let data = res.data;
    data.map(
      (component) =>
        (component.component.space = component.component.space_component)
    );

    dispatch({ type: SEARCH_COMPONENTS, payload: data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Populate Component dialog with payload
export const fillComponentDialog = (component) => ({
  type: FILL_DIALOG_COMPONENT,
  payload: component,
});

// Clear Component dialog state
export const clearComponentDialog = () => ({ type: CLEAR_DIALOG_COMPONENT });

// Clear Component search state
export const clearSearchState = () => ({ type: CLEAR_SEARCH_STATE });

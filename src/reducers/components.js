import produce from 'immer';
import {
  GET_WORKORDER,
  GET_SPACE_COMPONENTS,
  GET_WORK_ORDER_COMPONENTS,
  GET_COMPONENT_LINKS,
  SET_COMPONENT_LOADING,
  REMOVE_COMPONENT,
  SEARCH_COMPONENTS,
  SEARCH_LOADING,
  ADD_COMPONENT,
  CLEAR_WORKORDER_STATE,
} from 'actions/types';

export const initialState = {
  spaceComponents: [],
  current: null,
  workOrderComponents: [],
  workorderComponentIds: [],
  componentLoading: false,
  searchResults: [],
  searchLoading: false,
};

/* eslint-disable no-param-reassign */
const Components = (state = initialState, action) =>
  produce(state, (draft) => {
    const { payload, type } = action;
    switch (type) {
      case GET_WORKORDER:
        draft.workorderComponentIds = payload.components;
        break;
      case GET_SPACE_COMPONENTS:
        draft.spaceComponents = payload;
        break;
      case GET_WORK_ORDER_COMPONENTS:
        draft.workOrderComponents = [...state.workOrderComponents, ...payload];
        break;
      case GET_COMPONENT_LINKS:
        draft.workOrderComponents = state.workOrderComponents.map(
          (component) => {
            if (component.id === payload.componentId) {
              return { ...component, attachments: payload.links };
            } else {
              return component;
            }
          }
        );
        break;
      case ADD_COMPONENT:
        draft.workorderComponentIds.push(payload);
        break;
      case REMOVE_COMPONENT:
        draft.workOrderComponents = draft.workOrderComponents.filter(
          (component) => component.instanceId !== payload
        );
        draft.workorderComponentIds = draft.workorderComponentIds.filter(
          (component) => component.id !== payload
        );
        break;
      case SET_COMPONENT_LOADING:
        draft.componentLoading = payload;
        break;
      case SEARCH_COMPONENTS:
        draft.searchLoading = false;
        draft.searchResults = payload;
        break;
      case SEARCH_LOADING:
        draft.searchLoading = true;
        break;
      case CLEAR_WORKORDER_STATE:
        return { ...initialState };
      default:
        break;
    }
  });

export default Components;

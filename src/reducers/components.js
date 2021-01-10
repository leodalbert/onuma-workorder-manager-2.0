import produce from 'immer';
import {
  GET_SPACE_COMPONENTS,
  GET_WORK_ORDER_COMPONENTS,
  GET_COMPONENT_LINKS,
  SET_COMPONENT_LOADING,
  REMOVE_COMPONENT,
  SEARCH_COMPONENTS,
  SEARCH_LOADING,
} from 'actions/types';

export const initialState = {
  spaceComponents: [],
  current: null,
  workOrderComponents: [],
  componentLoading: true,
  searchResults: [],
  searchLoading: false,
};

/* eslint-disable no-param-reassign */
const Components = (state = initialState, action) =>
  produce(state, (draft) => {
    const { payload, type } = action;
    switch (type) {
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
      case REMOVE_COMPONENT:
        draft.workOrderComponents = draft.workOrderComponents.filter(
          (component) => component.instanceId !== payload
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
      default:
        break;
    }
  });

export default Components;

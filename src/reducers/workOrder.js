import produce from 'immer';
import {
  GET_WORKORDER,
  SEND_COMMENT_TO_REQUESTOR,
  CHANGE_WORKORDER_STATUS,
  CLEAR_WORKORDER_STATE,
  GET_ALL_SPACES,
  SET_WORKORDER_LOADING,
  SET_STATUS,
} from 'actions/types';

export const initialState = {
  id: undefined,
  administrator_comment: '',
  collaborators: [],
  building: { name: '' },
  space: { name: '' },
  status: 'Assigned',
  assigned_technician: {
    id: undefined,
    email: '',
  },
  maintenance_procedure_name: '',
  preventive_maintenance_description: '',
  maintenance_procedures: [],
  token: '',
  request_email_cc: '',
  siteBuildings: [],
  loading: true,
};

/* eslint-disable no-param-reassign */
const WorkOrder = (state = initialState, action) =>
  produce(state, (draft) => {
    let { type, payload } = action;
    switch (type) {
      case GET_WORKORDER:
        // remove parts of workorder directed at other reducers
        delete payload.tasks;
        delete payload.components;
        delete payload.collaborators;

        return {
          ...state,
          ...payload,
          maintenance_procedures: payload.maintenance_procedures || [],
          loading: false,
        };
      case SEND_COMMENT_TO_REQUESTOR:
        draft.administrator_comment = payload;
        break;
      case GET_ALL_SPACES:
        draft.siteBuildings = payload;
        break;
      case CHANGE_WORKORDER_STATUS:
      case SET_STATUS:
        draft.status = payload;
        break;
      case CLEAR_WORKORDER_STATE:
        return { ...initialState };
      case SET_WORKORDER_LOADING:
        draft.loading = true;
        break;
      default:
        break;
    }
  });

export default WorkOrder;

import produce from 'immer';
import { GET_WORKORDER, GET_WORKORDER_FILES } from 'actions/types';

export const initialState = {
  id: undefined,
  tasks: [],
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
  files: [],
  loading: true,
};

/* eslint-disable no-param-reassign */
const WorkOrder = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case GET_WORKORDER:
        return {
          ...state,
          ...payload,
          maintenance_procedures: payload.maintenance_procedures || [],
          loading: false,
        };
      case GET_WORKORDER_FILES:
        draft.files = payload;
        break;
      default:
        break;
    }
  });

export default WorkOrder;

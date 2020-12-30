import produce from 'immer';
import { GET_WORKORDER_TECH } from 'actions/types';

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
  error: {},
};

/* eslint-disable no-param-reassign */
const WorkOrder = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case GET_WORKORDER_TECH:
        draft.assigned_technician.email = payload.assigned_technician.email;
        draft.collaborators = payload.collaborators;
        break;
      default:
        break;
    }
  });

export default WorkOrder;

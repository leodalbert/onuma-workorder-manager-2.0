import { initialState } from './reducer';
/**
 * Get WorkOrder
 * @param state
 * @returns {Object}
 */
export const get = state => state.WorkOrder || initialState;

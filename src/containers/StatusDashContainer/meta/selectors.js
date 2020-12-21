import { initialState } from './reducer';
/**
 * Get StatusDash
 * @param state
 * @returns {Object}
 */
export const get = state => state.StatusDash || initialState;

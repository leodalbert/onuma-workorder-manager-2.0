import { initialState } from './reducer';
/**
 * Get StatusPage
 * @param state
 * @returns {Object}
 */
export const get = state => state.StatusPage || initialState;

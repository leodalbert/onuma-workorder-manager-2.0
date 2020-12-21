import { initialState } from './reducer';
/**
 * Get Header
 * @param state
 * @returns {Object}
 */
export const get = state => state.Header || initialState;

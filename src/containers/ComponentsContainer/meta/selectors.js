import { initialState } from './reducer';
/**
 * Get Components
 * @param state
 * @returns {Object}
 */
export const get = state => state.Components || initialState;

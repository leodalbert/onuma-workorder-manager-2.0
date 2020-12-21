import { initialState } from './reducer';
/**
 * Get Task
 * @param state
 * @returns {Object}
 */
export const get = state => state.Task || initialState;

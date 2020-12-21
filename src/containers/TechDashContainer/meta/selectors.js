import { initialState } from './reducer';
/**
 * Get TechDash
 * @param state
 * @returns {Object}
 */
export const get = state => state.TechDash || initialState;

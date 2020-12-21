import { initialState } from './reducer';
/**
 * Get Tech
 * @param state
 * @returns {Object}
 */
export const get = state => state.Tech || initialState;

import { initialState } from 'reducers/dashboard';
/**
 * Get Vacations
 * @param state
 * @returns {Object}
 */
export const selectDashboard = (state) => state.dashboard || initialState;
export const selectWorkorders = (state) => selectDashboard(state).workorders;

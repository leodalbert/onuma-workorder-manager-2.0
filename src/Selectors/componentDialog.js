import { initialState } from 'reducers/componentDialog';
/**
 * Get Components
 * @param state
 * @returns {Object}
 */
export const selectDialogComponent = (state) =>
  state.componentDialog || initialState;

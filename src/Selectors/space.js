import { initialState } from 'reducers/space';
/**
 * Get Space info
 * @param state
 * @returns {Object}
 */
export const selectSpace = (state) => state.space || initialState;
export const selectSpaceId = (state) => selectSpace(state).spaceId;

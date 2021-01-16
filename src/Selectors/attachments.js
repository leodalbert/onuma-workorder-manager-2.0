import { initialState } from 'reducers/attachments';
// import { createSelector } from 'reselect';
/**
 * Get Attachments
 * @param state
 * @returns {Object}
 */
export const selectAttachments = (state) => state.attachments || initialState;

export const selectWorkorderFiles = (state) => selectAttachments(state).files;

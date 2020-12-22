import { initialState } from 'reducers/urlParams';
// /**
//  * Get Vacations
//  * @param state
//  * @returns {Object}
//  */
export const selectUrlParams = (state) => state.urlParams || initialState;
export const selectStudio = (state) => selectUrlParams(state).studioId;
export const selectTechEmail = (state) => selectUrlParams(state).techEmail;

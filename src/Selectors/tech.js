import { initialState } from 'reducers/tech';
/**
 * Get Techs
 * @param state
 * @returns {Object}
 */
export const selectTech = (state) => state.tech || initialState;
export const selectTechToken = (state) => selectTech(state).token;
export const selectTechEmail = (state) => selectTech(state).email;
export const selectAllTechs = (state) => selectTech(state).techs;

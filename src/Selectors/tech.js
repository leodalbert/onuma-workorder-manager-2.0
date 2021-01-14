import { initialState } from 'reducers/tech';
import { createSelector } from 'reselect';
/**
 * Get Techs
 * @param state
 * @returns {Object}
 */
export const selectTech = (state) => state.tech || initialState;
export const selectTechToken = (state) => selectTech(state).token;
export const selectTechEmail = (state) => selectTech(state).email;
export const selectTechName = (state) => selectTech(state).name;
export const selectTechId = (state) => selectTech(state).id;
export const selectAllTechs = (state) => selectTech(state).techs;
export const makeSelectAllOtherTechs = createSelector(
  [selectAllTechs, selectTechId],
  (techs, currentTech) =>
    techs
      .filter((tech) => tech.id !== currentTech)
      .sort((a, b) =>
        a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1
      )
);

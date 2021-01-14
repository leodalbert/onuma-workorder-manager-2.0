import { createSelector } from 'reselect';
import { initialState } from 'reducers/collaborator';
import { selectAllTechs, selectTechId } from 'Selectors/tech';
/**
 * Get Vacations
 * @param state
 * @returns {Object}
 */
export const selectCollaborators = (state) =>
  state.collaborator.collaborators || initialState;

export const makeSelectCollaboratorTokens = createSelector(
  selectCollaborators,
  (collaborators) => {
    return collaborators.map((collaborator) => collaborator.collaborator.token);
  }
);

export const makeSelectWorkorderCollaboratorEmails = createSelector(
  selectCollaborators,
  (collaborators) => {
    return collaborators.map((collaborator) => collaborator.collaborator.email);
  }
);

export const makeSelectVisCollaborators = createSelector(
  [selectAllTechs, selectCollaborators],
  (techs, collaborators) => {
    return techs.filter((tech) => {
      return collaborators.some((collaborator) => {
        return collaborator.collaborator.id === tech.id;
      });
    });
  }
);

export const makeSelectAddCollaborators = createSelector(
  [selectAllTechs, selectCollaborators, selectTechId],
  (techs, collaborators, currentTech) => {
    return techs
      .filter((tech) => {
        return !collaborators.some((collaborator) => {
          return (
            tech.id === collaborator.collaborator.id || tech.id === currentTech
          );
        });
      })
      .sort((a, b) =>
        a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1
      );
  }
);

import { initialState } from 'reducers/workOrder';
import { createSelector } from 'reselect';
/**
 * Get Vacations
 * @param state
 * @returns {Object}
 */
export const selectWorkorder = (state) => state.workorder || initialState;

export const selectWorkorderTech = (state) =>
  selectWorkorder(state).assigned_technician.email;

export const selectWorkorderCollaborators = (state) =>
  selectWorkorder(state).collaborators;

export const makeSelectWorkorderCollaboratorTokens = createSelector(
  selectWorkorderCollaborators,
  (collaborators) => {
    return collaborators.map((collaborator) => collaborator.collaborator.token);
  }
);

export const makeSelectWorkorderCollaboratorEmails = createSelector(
  selectWorkorderCollaborators,
  (collaborators) => {
    return collaborators.map((collaborator) => collaborator.collaborator.email);
  }
);

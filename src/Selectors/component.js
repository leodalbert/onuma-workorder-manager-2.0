import { initialState } from 'reducers/components';
import { createSelector } from 'reselect';
/**
 * Get Components
 * @param state
 * @returns {Object}
 */
export const selectComponents = (state) => state.components || initialState;

export const selectWorkordeComponents = (state) =>
  selectComponents(state).workOrderComponents;

export const selectComponentLoading = (state) =>
  selectComponents(state).componentLoading;

export const selectSearchLoading = (state) =>
  selectComponents(state).searchLoading;

export const selectSpaceComponents = (state) =>
  selectComponents(state).spaceComponents;

export const selectWorkorderComponentIds = (state) =>
  selectComponents(state).workorderComponentIds;

export const makeSelectSpaceComponents = createSelector(
  selectComponents,
  (components) => {
    return components.spaceComponents;
  }
);
export const makeSelectComponentSearchResults = createSelector(
  selectComponents,
  (components) => {
    return components.searchResults;
  }
);

export const makeSelectWorkorderComponents = createSelector(
  selectComponents,
  (components) => {
    return components.workOrderComponents;
  }
);

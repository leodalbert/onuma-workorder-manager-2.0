import { initialState } from 'reducers/workOrder';
import { createSelector } from 'reselect';
/**
 * Get Vacations
 * @param state
 * @returns {Object}
 */
export const selectWorkorder = (state) => state.workorder || initialState;

export const selectWorkorderId = (state) => selectWorkorder(state).id;

export const selectWorkorderLoading = (state) => selectWorkorder(state).loading;

export const selectWorkorderTech = (state) =>
  selectWorkorder(state).assigned_technician;

export const selectWorkorderTechId = (state) => selectWorkorderTech(state).id;

export const selectWorkorderTechEmail = (state) =>
  selectWorkorderTech(state).email;

export const selectWorkorderSpaceName = (state) =>
  selectWorkorder(state).space.name;

export const selectWorkorderBuildingName = (state) =>
  selectWorkorder(state).building.name;

export const selectRequestEmail = (state) =>
  selectWorkorder(state).request_email;

export const selectSiteBuildings = (state) =>
  selectWorkorder(state).siteBuildings;

export const selectWorkorderStatus = (state) => selectWorkorder(state).status;

export const makeSelectWorkorder = createSelector(
  selectWorkorder,
  (workorder) => {
    const {
      files,
      collaborators,
      loading,
      token,
      ...everythingElse
    } = workorder;
    return everythingElse;
  }
);

export const makeSelectWorkorderSpaceForComponentSearch = createSelector(
  selectWorkorder,
  (workorder) => {
    const { id: workorderId, building, space } = workorder;
    return { workorderId, building, space };
  }
);

export const makeSelectWorkorderTechName = createSelector(
  selectWorkorderTech,
  (tech) => `${tech.first_name} ${tech.last_name}`
);

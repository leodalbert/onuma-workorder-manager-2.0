import { initialState } from 'reducers/auth';
/**
 * Get Vacations
 * @param state
 * @returns {Object}
 */
export const selectAuth = (state) => state.auth || initialState;
export const selectAuthToken = (state) => selectAuth(state).token;
export const selectAuthRedirect = (state) => selectAuth(state).redirect;
export const selectAuthLoading = (state) => selectAuth(state).authLoading;
export const selectIsAuth = (state) => selectAuth(state).isAuthenticated;

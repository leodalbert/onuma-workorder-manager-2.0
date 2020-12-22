import { URL_PARAMS } from './types';

// set state from URL params
export const setUrlParams = (payload) => ({
  type: URL_PARAMS,
  payload,
});

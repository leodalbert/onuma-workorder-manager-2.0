import network from 'utils/network';
import { GET_SPACE_COMPONENTS, LOGIN_FAIL } from 'actions/types';

export const getSpaceComponents = (spaceId, studioId) => async (dispatch) => {
  try {
    const res = await network.getSpaceComponents(spaceId, studioId);
    dispatch({ type: GET_SPACE_COMPONENTS, payload: res.data.components });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

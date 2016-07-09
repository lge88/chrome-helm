import * as types from '../constants/ActionTypes';
import { getTabCandidates } from '../helm';

export function search(query) {
  return (dispatch, getState) => {
    dispatch({ type: types.UPDATE_QUERY, query });

    getTabCandidates(query, {}, candidates => {
      dispatch({ type: types.UPDATE_GROUP, group: 'Tabs', candidates });
    });
    // TODO:
    // Foreach source in state:
    //   search query in source
    //   Update group once search returns
  }
}

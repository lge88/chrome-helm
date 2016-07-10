import * as types from '../constants/ActionTypes';
import * as helm from '../helm';

export function search(query) {
  const fn = (dispatch, getState) => {
    dispatch({ type: types.UPDATE_QUERY, query });

    helm.search(query, {}, searchResult => {
      const { source, candidates } = searchResult;
      dispatch({ type: types.UPDATE_GROUP, group: source, candidates });
    });
  };

  return fn;
}

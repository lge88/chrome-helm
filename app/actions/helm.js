import * as types from '../constants/ActionTypes';
import * as helm from '../helm';

export function search(query) {
  const fn = (dispatch, getState) => {
    dispatch({ type: types.UPDATE_QUERY, query });

    const { currentSessionName } = getState();

    helm.search(currentSessionName, query, {}, searchResult => {
      const { sourceName, displayedName, candidates } = searchResult;
      dispatch({ type: types.UPDATE_SOURCE, sourceName, displayedName, candidates });
    });
  };

  return fn;
}

export function loadState(stateName) {
  return { type: types.LOAD_STATE, stateName };
}

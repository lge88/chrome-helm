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

export function selectSession(sessionName) {
  return (dispatch, getState) => {
    helm.getOrCreateSession(sessionName, (session) => {
      if (!session) return;

      const { sessionName, sessionDisplayedName, sourceNames, actionNames } = session;
      dispatch({
        type: types.UPDATE_SESSION,
        currentSessionName: sessionName,
        currentSessionDisplayedName: sessionDisplayedName,
        sourceNames,
        actionNames
      });

      const { currentSessionName, query } = getState();
      helm.search(currentSessionName, query, {}, searchResult => {
        const { sourceName, displayedName, candidates } = searchResult;
        dispatch({ type: types.UPDATE_SOURCE, sourceName, displayedName, candidates });
      });
    });
  };
}

export function loadState(stateName) {
  return { type: types.LOAD_STATE, stateName };
}

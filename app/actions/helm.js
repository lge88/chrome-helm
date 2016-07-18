import * as types from '../constants/ActionTypes';
import * as helm from '../helm';

function noop() {}

export function search(query) {
  return (dispatch, getState) => {
    const { isLoading, currentSessionName } = getState();
    if (isLoading) return;

    dispatch({ type: types.UPDATE_QUERY, query });
    helm.search(currentSessionName, query, {}, searchResult => {
      const { sourceName, displayedName, candidates } = searchResult;
      dispatch({ type: types.UPDATE_SOURCE, sourceName, displayedName, candidates });
    });
  };
}

export function selectSession(sessionName, callback) {
  return (dispatch, getState) => {
    dispatch({ type: types.UPDATE_LOADING, isLoading: true });
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
        dispatch({ type: types.UPDATE_LOADING, isLoading: false });
        if (typeof callback === 'function') callback();
      });
    });
  };
}

export function loadState(stateName) {
  return { type: types.LOAD_STATE, stateName };
}

function getSingleSelectedCandidate(cursor, resultsBySourceName) {
  const result = cursor && resultsBySourceName[cursor.sourceName];
  const candidate = result && result.candidates && result.candidates[cursor.index];
  return candidate || null;
}

export function runDefaultAction() {
  return (dispatch, getState) => {
    const {
      currentSessionName,
      resultsBySourceName,
      cursor,
      multiSelections,
      isLoading
    } = getState();

    if (isLoading) return;

    // get candidates from single/multi selection
    // TODO: handle multi selections
    let candidates = [];
    const candidate = getSingleSelectedCandidate(cursor, resultsBySourceName);
    if (candidate) candidates.push(candidate);

    const context = {}, callback = noop;
    helm.runDefaultAction(currentSessionName, candidates, context, () => {
      dispatch({ type: types.UPDATE_QUERY, query: '' });

      const { currentSessionName } = getState();
      helm.search(currentSessionName, '', {}, searchResult => {
        const { sourceName, displayedName, candidates } = searchResult;
        dispatch({ type: types.UPDATE_SOURCE, sourceName, displayedName, candidates });
      });
    });
  };
}

export function runPersistentAction() {
  return (dispatch, getState) => {
    const {
      currentSessionName,
      resultsBySourceName,
      cursor,
      isLoading
    } = getState();
    if (isLoading) return;

    let candidates = [];
    const candidate = getSingleSelectedCandidate(cursor, resultsBySourceName);
    if (candidate) candidates.push(candidate);

    const context = {}, callback = noop;
    helm.runPersistentAction(currentSessionName, candidates, context, noop);
  };
}

export function prevCandidate() {
  return (dispatch, getState) => {
    const { isLoading } = getState();
    if (isLoading) return;
    dispatch({ type: types.PREV_CANDIDATE });
  };
}

export function nextCandidate() {
  return (dispatch, getState) => {
    const { isLoading } = getState();
    if (isLoading) return;
    dispatch({ type: types.NEXT_CANDIDATE });
  };
}

export function quitHelmSession() {
  helm.gotoLastFocused();
  return noop;
}

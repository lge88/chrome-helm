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

function getSingleSelectedCandidate(cursor, resultsBySourceName) {
  const result = cursor && resultsBySourceName[cursor.sourceName];
  const candidate = result && result.candidates && result.candidates[cursor.index];
  return candidate || null;
}

function noop() {}

function runDefaultAction(dispatch, getState) {
  const {
    currentSessionName,
    resultsBySourceName,
    cursor,
    multiSelections
  } = getState();

  // get candidates from single/multi selection
  // TODO: handle multi selections
  let candidates = [];
  const candidate = getSingleSelectedCandidate(cursor, resultsBySourceName);
  if (candidate) candidates.push(candidate);

  const context = {}, callback = noop;
  helm.runAction(currentSessionName, 0, candidates, context, callback);
}

export function onKeyDown(e) {
  return (dispatch, getState) => {
    // Read keybinding from getState().
    if (e.keyCode === 13) {
      // Enter key
      runDefaultAction(dispatch, getState);
    } else if (e.keyCode === 38 || (e.ctrlKey && e.keyCode === 80)) {
      // Up key or Ctrl-p
      dispatch({ type: types.PREV_CANDIDATE });
    } else if (e.keyCode === 40 || (e.ctrlKey && e.keyCode === 78)) {
      // Down key or Ctrl-n
      dispatch({ type: types.NEXT_CANDIDATE });
    } else if (e.keyCode === 27) {
      helm.gotoLastFocused();
    }
  };
}

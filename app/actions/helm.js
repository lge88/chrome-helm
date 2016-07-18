import * as types from '../constants/ActionTypes';
import * as helm from '../helm';

function noop() {}

export function search(query) {
  return (dispatch, getState) => {
    const { isLoading, currentSessionName } = getState();
    if (isLoading) return;

    dispatch({ type: types.UPDATE_QUERY, query });
    const onUpdate = (searchResult) => {
      const { sourceName, displayedName, candidates } = searchResult;
      dispatch({ type: types.UPDATE_SOURCE, sourceName, displayedName, candidates });
    };
    helm.search(currentSessionName, query, {}, onUpdate);
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
        // TODO: action object more than just names
        actions: actionNames
      });

      const { currentSessionName, itemSelection } = getState();
      const { query } = itemSelection;

      const onUpdate = (searchResult) => {
        const { sourceName, displayedName, candidates } = searchResult;
        dispatch({ type: types.UPDATE_SOURCE, sourceName, displayedName, candidates });
      };

      const onComplete = () => {
        dispatch({ type: types.UPDATE_LOADING, isLoading: false });
        if (typeof callback === 'function') callback();
      };

      helm.search(currentSessionName, query, {}, onUpdate, onComplete);
    });
  };
}

export function loadState(stateName) {
  return { type: types.LOAD_STATE, stateName };
}

function getSelectedCandidates(getState, { enableMultiSelection }) {
  let candidates = [];

  const state = getState();
  const { mode } = state;
  if (mode !== 'itemSelection') return candidates;

  const  { resultsBySourceName, cursor, multiSelections } = state.itemSelection;

  const isMultiSelection = enableMultiSelection &&
          multiSelections && Object.keys(multiSelections).length > 0;

  if (isMultiSelection) {
    // TODO: handle multi selection
  } else {
    const result = cursor && resultsBySourceName[cursor.sourceName];
    const candidate = result && result.candidates && result.candidates[cursor.index];
    candidates.push(candidate);
  }
  return candidates;
}

export function runDefaultAction() {
  return (dispatch, getState) => {
    const {
      currentSessionName,
      isLoading
    } = getState();

    if (isLoading) return;

    const candidates = getSelectedCandidates(getState, { enableMultiSelection: true });

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
      isLoading
    } = getState();

    if (isLoading) return;

    const candidates = getSelectedCandidates(getState, { enableMultiSelection: false });

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

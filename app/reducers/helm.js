import * as ActionTypes from '../constants/ActionTypes';
import states from '../fixtures/states';

const clone = (obj) => JSON.parse(JSON.stringify(obj));

// function isCursorValid(cursor, resultsBySourceName) {
//   if (!cursor) return false;

//   const result = resultsBySourceName[cursor.sourceName];
//   if (!result) return false;

//   const candidates = result.candidates;
//   if (!candidates) return false;

//   return cursor.index >= 0 && cursor.index < candidates.length;
// }

function getFirstNonEmptySource(sourceNames, resultsBySourceName) {
  console.log('getFirstNonEmptySource');
  console.log(sourceNames);
  console.log(resultsBySourceName);

  for (let i = 0, len = sourceNames.length; i < len; ++i) {
    const sourceName = sourceNames[i];
    const result = resultsBySourceName[sourceName];
    if (result && result.candidates && result.candidates.length > 0) {
      return sourceName;
    }
  }
  return null;
}

const actionsMap = {
  [ActionTypes.LOAD_STATE](state, action) {
    const { stateName } = action;
    const newState = states[stateName];
    if (newState) return clone(newState);
    return state;
  },

  [ActionTypes.UPDATE_QUERY](state, action) {
    const { query } = action;
    return { ...state, query };
  },

  [ActionTypes.UPDATE_SOURCE](state, action) {
    const { sourceName, displayedName, candidates } = action;
    const resultsBySourceName = clone(state.resultsBySourceName);
    resultsBySourceName[sourceName] = { displayedName, candidates };

    // Update cursor
    const { sourceNames } = state;
    const cursor = {
      sourceName: getFirstNonEmptySource(sourceNames, resultsBySourceName),
      index: 0
    };

    // TODO: update multi selection
    return { ...state, resultsBySourceName, cursor };
  },

  [ActionTypes.UPDATE_SESSION](state, action) {
    const { currentSessionName, currentSessionDisplayedName, sourceNames } = action;
    return { ...state, currentSessionName, currentSessionDisplayedName, sourceNames };
  }
};

export default function helm(state, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

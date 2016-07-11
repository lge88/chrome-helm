import * as ActionTypes from '../constants/ActionTypes';
import states from '../fixtures/states';

const clone = (obj) => JSON.parse(JSON.stringify(obj));

function getFirstNonEmptySource(sourceNames, resultsBySourceName) {
  for (let i = 0, len = sourceNames.length; i < len; ++i) {
    const sourceName = sourceNames[i];
    const result = resultsBySourceName[sourceName];
    if (result && result.candidates && result.candidates.length > 0) {
      return sourceName;
    }
  }
  return null;
}

class CursorHandle {
  constructor() {
    this._sourceNames = null;
    this._resultsBySourceName = null;
    this._links = null;
  }

  reset(sourceNames, resultsBySourceName) {
    if (this._sourceNames === sourceNames &&
        this._resultsBySourceName === resultsBySourceName) {
      return;
    }

    this._sourceNames = sourceNames;
    this._resultsBySourceName = resultsBySourceName;
    this._links = {};
    const len = this._sourceNames.length;
    for (let i = 0; i < len; ++i) {
      const sourceName = this._sourceNames[i];
      const prev = i - 1 >= 0 ? this._sourceNames[i - 1] : null;
      const next = i + 1 < len ? this._sourceNames[i + 1] : null;
      this._links[sourceName] = { prev, next };
    }
  }

  prevSourceName(sourceName) {
    return this._links[sourceName].prev;
  }

  nextSourceName(sourceName) {
    return this._links[sourceName].next;
  }

  next(cursor) {
    if (!cursor) return null;
    const { sourceName, index } = cursor;
    const len = this._resultsBySourceName[sourceName].candidates.length;
    if (index + 1 < len) {
      return { sourceName, index: index + 1 };
    } else {
      const newSourceName = this.nextSourceName(sourceName);
      if (newSourceName &&
          this._resultsBySourceName[newSourceName] &&
          this._resultsBySourceName[newSourceName].candidates &&
          this._resultsBySourceName[newSourceName].candidates.length > 0) {
        return { sourceName: newSourceName, index: 0 };
      } else {
        // Unchanged
        return cursor;
      }
    }
  }

  prev(cursor) {
    if (!cursor) return null;
    const { sourceName, index } = cursor;
    const len = this._resultsBySourceName[sourceName].candidates.length;
    if (index - 1 >= 0) {
      return { sourceName, index: index - 1 };
    } else {
      const newSourceName = this.prevSourceName(sourceName);
      if (newSourceName &&
          this._resultsBySourceName[newSourceName] &&
          this._resultsBySourceName[newSourceName].candidates &&
          this._resultsBySourceName[newSourceName].candidates.length > 0) {
        const newLen = this._resultsBySourceName[newSourceName].candidates.length;
        return { sourceName: newSourceName, index: newLen - 1 };
      } else {
        // Unchanged
        return cursor;
      }
    }
  }
}

const cursorHandle = new CursorHandle();

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
  },

  [ActionTypes.PREV_CANDIDATE](state, action) {
    const { sourceNames, resultsBySourceName, cursor } = state;
    cursorHandle.reset(sourceNames, resultsBySourceName);
    const newCursor = cursorHandle.prev(cursor);
    return { ...state, cursor: newCursor };
  },

  [ActionTypes.NEXT_CANDIDATE](state, action) {
    const { sourceNames, resultsBySourceName, cursor } = state;
    cursorHandle.reset(sourceNames, resultsBySourceName);
    const newCursor = cursorHandle.next(cursor);
    return { ...state, cursor: newCursor };
  }
};

export default function helm(state, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

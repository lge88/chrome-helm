import * as ActionTypes from '../constants/ActionTypes';
import states from '../fixtures/states';

const clone = (obj) => JSON.parse(JSON.stringify(obj));

class CursorHandle {
  constructor() {
    this._sourceNames = null;
    this._resultsBySourceName = null;
    this._indices = null;
  }

  reset(sourceNames, resultsBySourceName) {
    if (this._sourceNames === sourceNames &&
        this._resultsBySourceName === resultsBySourceName) {
      return;
    }

    this._sourceNames = sourceNames;
    this._resultsBySourceName = resultsBySourceName;
    this._indices = this._sourceNames.reduce((sofar, sourceName, index) => {
      sofar[sourceName] = index;
      return sofar;
    }, {});
  }

  getFirstNonEmptySource() {
    for (let i = 0, len = this._sourceNames.length; i < len; ++i) {
      const sourceName = this._sourceNames[i];
      const result = this._resultsBySourceName[sourceName];
      if (result && result.candidates && result.candidates.length > 0) {
        return sourceName;
      }
    }
    return null;
  }

  prevSourceName(sourceName) {
    const idx = this._indices[sourceName] - 1;
    return idx >= 0 ? this._sourceNames[idx] : null;
  }

  prevNonEmptySourceName(sourceName) {
    let newSourceName = this.prevSourceName(sourceName);
    while (newSourceName && this._resultsBySourceName[newSourceName].candidates.length === 0) {
      newSourceName = this.prevSourceName(newSourceName);
    }
    return newSourceName;
  }

  nextSourceName(sourceName) {
    const idx = this._indices[sourceName] + 1;
    return idx < this._sourceNames.length ? this._sourceNames[idx] : null;
  }

  nextNonEmptySourceName(sourceName) {
    let newSourceName = this.nextSourceName(sourceName);
    while (newSourceName && this._resultsBySourceName[newSourceName].candidates.length === 0) {
      newSourceName = this.nextSourceName(newSourceName);
    }
    return newSourceName;
  }

  next(cursor) {
    if (!cursor) return null;
    const { sourceName, index } = cursor;
    const len = this._resultsBySourceName[sourceName].candidates.length;
    if (index + 1 < len) {
      return { sourceName, index: index + 1 };
    } else {
      const newSourceName = this.nextNonEmptySourceName(sourceName);
      if (newSourceName && this._resultsBySourceName[newSourceName].candidates.length > 0) {
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
      const newSourceName = this.prevNonEmptySourceName(sourceName);
      if (newSourceName && this._resultsBySourceName[newSourceName].candidates.length > 0) {
        const newLen = this._resultsBySourceName[newSourceName].candidates.length;
        return { sourceName: newSourceName, index: newLen - 1 };
      } else {
        // Unchanged
        return cursor;
      }
    }
  }

  // Return true if sourceA should be ranked before sourceB.
  isBefore(sourceA, sourceB) {
    return this._indices[sourceA] < this._indices[sourceB];
  }

  // Update cursor position if any of the condition meets
  //   - It was null;
  //   - sourceName was null;
  //   - The source cursor pointed at is updated
  //   - The source above cursor is updated.
  shouldUpdateCursor(cursor, updatedSourceName) {
    return !cursor ||
      !cursor.sourceName ||
      cursor.sourceName === updatedSourceName ||
      this.isBefore(updatedSourceName, cursor.sourceName);
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

  [ActionTypes.UPDATE_LOADING](state, action) {
    const { isLoading } = action;
    return { ...state, isLoading };
  },

  [ActionTypes.UPDATE_QUERY](state, action) {
    const { itemSelection } = state;
    const { query } = action;
    const newItemSelection = { ...itemSelection, query };
    return { ...state, itemSelection: newItemSelection };
  },

  [ActionTypes.UPDATE_SOURCE](state, action) {
    const itemSelection = state.itemSelection;
    const { sourceNames } = itemSelection;
    const { sourceName: updatedSourceName, displayedName, candidates } = action;
    let { resultsBySourceName, cursor } = itemSelection;

    // Update results
    resultsBySourceName = clone(resultsBySourceName);
    resultsBySourceName[updatedSourceName] = { displayedName, candidates };

    // Update cursor
    cursorHandle.reset(sourceNames, resultsBySourceName);
    if (cursorHandle.shouldUpdateCursor(cursor, updatedSourceName)) {
      cursor = {
        sourceName: cursorHandle.getFirstNonEmptySource(),
        index: 0
      };
    }

    // TODO: update multi selection
    const newItemSelection = { ...itemSelection, resultsBySourceName, cursor };
    return { ...state, itemSelection: newItemSelection };
  },

  [ActionTypes.UPDATE_SESSION](state, action) {
    const { currentSessionName, currentSessionDisplayedName, sourceNames, actions } = action;
    const itemSelection = state.itemSelection;
    const actionSelection = state.actionSelection;

    // TODO: handle action names
    const newItemSelection = { ...itemSelection, sourceNames };
    const newActionSelection = { ...actionSelection, actions };
    return {
      ...state,
      currentSessionName,
      currentSessionDisplayedName,
      itemSelection: newItemSelection,
      actionSelection: newActionSelection
    };
  },

  [ActionTypes.PREV_CANDIDATE](state, action) {
    const { mode } = state;
    if (mode !== 'itemSelection') return state;

    const itemSelection = state.itemSelection;
    const { sourceNames, resultsBySourceName, cursor } = itemSelection;
    cursorHandle.reset(sourceNames, resultsBySourceName);
    const newCursor = cursorHandle.prev(cursor);
    const newItemSelection = { ...itemSelection, cursor: newCursor };
    return { ...state, itemSelection: newItemSelection };
  },

  [ActionTypes.NEXT_CANDIDATE](state, action) {
    const { mode } = state;
    if (mode !== 'itemSelection') return state;

    const itemSelection = state.itemSelection;
    const { sourceNames, resultsBySourceName, cursor } = itemSelection;
    cursorHandle.reset(sourceNames, resultsBySourceName);
    const newCursor = cursorHandle.next(cursor);
    const newItemSelection = { ...itemSelection, cursor: newCursor };
    return { ...state, itemSelection: newItemSelection };
  },

  [ActionTypes.UPDATE_MODE](state, action) {
    const { mode: newMode } = action;
    return { ...state, mode: newMode };
  },

  [ActionTypes.TOGGLE_ACTION_SELECTION](state, action) {
    const { mode } = state;
    const newMode = mode === 'actionSelection' ? 'itemSelection' : 'actionSelection';
    return { ...state, mode: newMode };
  },

  [ActionTypes.UPDATE_ACTION_QUERY](state, action) {
    const { actionSelection } = state;
    const { query } = action;
    const newActionSelection = { ...actionSelection, query };
    return { ...state, actionSelection: newActionSelection };
  },

  [ActionTypes.UPDATE_ACTIONS](state, action) {
    const { actionSelection } = state;
    const { actions } = action;
    const newActionSelection = { ...actionSelection, actions, index: 0 };
    return { ...state, actionSelection: newActionSelection };
  },

  [ActionTypes.PREV_ACTION](state, action) {
    const { actionSelection } = state;
    const { index } = actionSelection;
    const newIndex = index - 1 >= 0 ? index - 1 : index;
    const newActionSelection = { ...actionSelection, index: newIndex };
    return { ...state, actionSelection: newActionSelection };
  },

  [ActionTypes.NEXT_ACTION](state, action) {
    const { actionSelection } = state;
    const { actions, index } = actionSelection;
    const newIndex = index + 1 < actions.length ? index + 1 : index;
    const newActionSelection = { ...actionSelection, index: newIndex };
    return { ...state, actionSelection: newActionSelection };
  }
};

export default function helm(state, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

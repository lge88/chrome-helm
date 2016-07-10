import * as ActionTypes from '../constants/ActionTypes';
import states from '../fixtures/states';

const clone = (obj) => JSON.parse(JSON.stringify(obj));

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
    return { ...state, resultsBySourceName };
  }
};

export default function helm(state, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

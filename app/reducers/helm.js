import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  query: '',
  groups: null,
  selections: []
};

const actionsMap = {
  [ActionTypes.UPDATE_QUERY](state, action) {
    const { query } = action;
    return { ...state, query };
  },

  [ActionTypes.UPDATE_GROUP](state, action) {
    const { group, candidates } = action;
    return { ...state, groups: [ { name: group, candidates } ] };
  }
};

export default function helm(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

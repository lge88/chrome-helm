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
  }
};

export default function helm(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

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
    const { groups } = state;
    let newGroups = [ ...groups ];
    let i = 0, len = newGroups.length;
    for (; i < len; ++i) {
      if (newGroups[i].name === group) break;
    }

    const updatedGroup = { name: group, candidates };
    if (i >= len) {
      newGroups.push(updatedGroup);
    } else {
      newGroups[i] = updatedGroup;
    }

    return { ...state, groups: newGroups };
  }
};

export default function helm(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}

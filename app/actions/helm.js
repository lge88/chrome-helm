import * as types from '../constants/ActionTypes';

export function search(query) {
  return (dispatch, getState) => {
    dispatch({ type: types.UPDATE_QUERY, query });
    // TODO:
    // Foreach source in state:
    //   search query in source
    //   Update group once search returns
  }
}

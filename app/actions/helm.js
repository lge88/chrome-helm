import * as types from '../constants/ActionTypes';
import { getTabCandidates } from '../helm';
import { getBookmarkCandidates } from '../helm';

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

export function search(query) {
  const fn = (dispatch, getState) => {
    dispatch({ type: types.UPDATE_QUERY, query });

    getTabCandidates(query, {}, candidates => {
      dispatch({ type: types.UPDATE_GROUP, group: 'Tabs', candidates });
    });

    getBookmarkCandidates(query, {}, candidates => {
      dispatch({ type: types.UPDATE_GROUP, group: 'Bookmarks', candidates });
    });
    // TODO:
    // Foreach source in state:
    //   search query in source
    //   Update group once search returns
  };
  return fn;
  /*   return debounce(fn, 100);*/
}

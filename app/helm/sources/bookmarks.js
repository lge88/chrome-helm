function createBookmarkCandidate(bookmark) {
  return {
    title: bookmark.title,
    url: bookmark.url,
    bookmark: bookmark
  };
}

function escapeRegex(str) {
  return str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&');
}

function filterCandidate(query, candidate) {
  if (query === '') return true;

  function filterToken(token) {
    token = escapeRegex(token);
    const re = new RegExp(token, "i");
    return candidate.title.search(re) >= 0 ||
      candidate.url.search(re) >= 0;
  }

  return query.split(/\s+/).every(filterToken);
}

function flatten(bookmarks, node) {
  if (node.children && node.children.length > 0) {
    for (let i = 0, len = node.children.length; i < len; ++i) {
      flatten(bookmarks, node.children[i]);
    }
  } else {
    const candidate = createBookmarkCandidate(node);
    bookmarks.push(candidate);
  }
}

export class BookmarkSource {
  static key = 'bookmarks';
  static displayedName = 'Bookmarks';

  constructor(options) {
    this._bookmarks = [];
    const iter = flatten.bind(null, this._bookmarks);
    chrome.bookmarks.getTree(nodes => nodes.forEach(iter));

    // TODO: listen to bookmarks change events
    // update this._bookmarks
  }

  getName() {
    return 'bookmarks';
  }

  getDisplayedName() {
    return 'Bookmarks';
  }

  search(query, options, callback) {
    const candidates = this._bookmarks.filter(filterCandidate.bind(null, query));
    callback(candidates);
  }

  destroy() {
    // TODO: stop listen to bookmarks change events
  }
}

function createBookmarkCandidate(bookmark) {
  return {
    title: bookmark.title,
    details: bookmark.url,
    url: bookmark.url,
    bookmark: bookmark,
    sourceName: 'bookmarks'
  };
}

function flatten(bookmarks, limit, node) {
  if (bookmarks.length >= limit) return;
  if (node.children && node.children.length > 0) {
    for (let i = 0, len = node.children.length; i < len; ++i) {
      flatten(bookmarks, limit, node.children[i]);
      if (bookmarks.length >= limit) return;
    }
  } else {
    const candidate = createBookmarkCandidate(node);
    bookmarks.push(candidate);
  }
}

export class BookmarkSource {
  static key = 'bookmarks';
  static displayedName = 'Bookmarks';

  static defaultOptions = {
    limit: 100
  };

  constructor(options) {
    this._options = { ...BookmarkSource.defaultOptions, ...options };
  }

  search(query, options, callback) {
    const { limit } = { ...this._options, ...options };
    chrome.bookmarks.search(query, (nodes) => {
      let candidates = [];
      const iter = flatten.bind(null, candidates, limit);
      nodes.forEach(iter);
      callback(candidates);
    });
  }

  destroy() {}
}

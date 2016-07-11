import { AttributeMatcher } from '../../utils/AttributeMatcher';

function createBookmarkCandidate(bookmark) {
  return {
    title: bookmark.title,
    url: bookmark.url,
    bookmark: bookmark,
    sourceName: 'bookmarks'
  };
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

  static defaultOptions = {
    limit: 10
  };

  constructor(options) {
    this._options = { ...BookmarkSource.defaultOptions, options };
    this._matcher = new AttributeMatcher([ 'title', 'url' ]);

    this._bookmarks = [];
    const iter = flatten.bind(null, this._bookmarks);
    chrome.bookmarks.getTree(nodes => nodes.forEach(iter));
    // TODO: listen to bookmarks change events
    // update this._bookmarks
  }

  search(query, options, callback) {
    const filter = this._matcher.test.bind(this._matcher, query);
    const { limit } = { ...this._options, options };

    let candidates = [];
    for (let i = 0, len = this._bookmarks.length; i < len; ++i) {
      const candidate = this._bookmarks[i];
      if (filter(candidate) && candidates.length < limit) candidates.push(candidate);
    }
    callback(candidates);
  }

  destroy() {
    // TODO: stop listen to bookmarks change events
  }
}

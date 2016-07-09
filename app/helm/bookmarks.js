let bookmarks = [];

function flatten(node) {
  if (node.children && node.children.length > 0) {
    node.children.forEach(flatten);
  } else {
    let candidate = createBookmarkCandidate(node);
    bookmarks.push(candidate);
  }
}

function bootstrap() {
  chrome.bookmarks.getTree(nodes => {
    console.log('tree', nodes);
    nodes.forEach(flatten);
    console.log('bookmarks', bookmarks);
  });
}

window.addEventListener('load', bootstrap);

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


export function getBookmarkCandidates(query, options, callback) {
  let candidates = bookmarks.filter(filterCandidate.bind(null, query));
  callback(candidates);
}

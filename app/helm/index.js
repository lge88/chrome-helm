const maxNumCandidates = 1000;

function createTabCandidate(tab) {
  return {
    title: tab.title,
    url: tab.url,
    thumb: tab.favIconUrl,
    tab: tab
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

export function getTabCandidates(query, options, callback) {
  chrome.tabs.query({}, function(aTabs) {
    let candidates = [];
    for (let i = 0, len = aTabs.length; i < len; ++i) {
      let tab = aTabs[i];
      let candidate = createTabCandidate(tab);
      if (filterCandidate(query, candidate)) {
        candidates.push(candidate);
      }
      if (candidates.length >= maxNumCandidates) break;
    }
    callback(candidates);
  });
}

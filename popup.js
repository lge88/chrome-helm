var candidateTemplate;
var selectedIndex = 0;
var maxNumCandidates = 20;
var candidates = [];

function renderCandidate(candidate) {
  return Mustache.render(candidateTemplate, candidate);
}

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
    let re = new RegExp(token, "i");
    return candidate.title.search(re) >= 0 ||
      candidate.url.search(re) >= 0;
  }

  return query.split(/\s+/).every(filterToken);
}

function updateCandidates(callback) {
  let query = document.querySelector('#search-box').value;
  candidates = [];

  chrome.tabs.query({}, function(aTabs) {
    for (let i = 0, len = aTabs.length; i < len; ++i) {
      let tab = aTabs[i];
      let candidate = createTabCandidate(tab);
      if (filterCandidate(query, candidate)) {
        candidates.push(candidate);
      }
      if (candidates.length >= maxNumCandidates) break;
    }
    callback();
  });
}

function renderCandidates() {
  let container = document.querySelector('#candidates-body');
  let query = document.querySelector('#search-box').value;

  container.innerHTML = '';
  candidates.forEach(function(candidate) {
    container.innerHTML += renderCandidate(candidate);
  });
}

function updateSelection() {
  const elements = document.querySelectorAll('#candidates-body > tr');
  for (let i = 0, len = elements.length; i < len; ++i) {
    if (i === selectedIndex) {
      elements[i].classList.add('selected');
    } else {
      elements[i].classList.remove('selected');
    }
  }
}

function update() {
  updateCandidates(function() {
    renderCandidates();
    updateSelection();
  });
}

function prevCandidate() {
  if (selectedIndex > 0) {
    --selectedIndex;
    updateSelection();
  }
}

function nextCandidate() {
  if (selectedIndex < candidates.length - 1) {
    ++selectedIndex;
    updateSelection();
  }
}

function gotoSelectedTab() {
  const selected = candidates[selectedIndex];
  if (selected) {
    chrome.tabs.update(selected.tab.id, {
      active: true,
      selected: true
    });
    chrome.windows.update(selected.tab.windowId, {
      focused: true
    });
    // restore state
  }
}

function runAction(e) {
  console.log('key', e);
  if (e.keyCode === 13) {
    // Enter key, goto selected tap
    gotoSelectedTab();
  } else if (e.keyCode === 38 || (e.ctrlKey && e.keyCode === 80)) {
    // Up key or Ctrl-p
    prevCandidate();
  } else if (e.keyCode === 40 || (e.ctrlKey && e.keyCode === 78)) {
    // Down key or Ctrl-n
    nextCandidate();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  candidateTemplate = document.querySelector('#candidate-template').innerHTML;
  Mustache.parse(candidateTemplate);

  update();
  document.querySelector('#search-box').addEventListener('input', update);
  document.querySelector('#search-box').addEventListener('keydown', runAction);
});

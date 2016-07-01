function renderCandidate(candidate) {

}

function createTabCandidate(tab) {
  return {
    title: tab.title,
    url: tab.url,
    thumb: tab.favIconUrl
  };
}


function getAllTabs() {
  chrome.tabs.query({}, function(aTabs) {
    let tabs = document.querySelector('#candidates');
    aTabs.forEach(function(tab) {
      // console.log(tab.title, tab.url);
      let entry = document.createElement('div');

      let icon = document.createElement('img');
      icon.src = tab.favIconUrl;

      let title = document.createElement('div');
      title.textContent = tab.title;

      let link = document.createElement('div');
      link.textContent = tab.url;

      // entry.appendChild(icon);
      entry.appendChild(title);
      entry.appendChild(link);
      console.log(tab);
      tabs.appendChild(entry);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // getAllTabs();
});

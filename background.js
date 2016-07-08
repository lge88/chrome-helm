function createOrShowHelmWindow() {
  chrome.tabs.query({
    title: 'Chrome Helm'
  }, (tabs) => {
    console.log('tabs', tabs);
    if (tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, {
        active: true,
        selected: true
      });
      chrome.windows.update(tabs[0].windowId, {
        focused: true
      });
    } else {
      chrome.windows.create({
        type: 'popup',
        left: 100,
        top: 100,
        width: 800,
        height: 475,
        url: 'helm.html'
      });
    }
  });
}

chrome.browserAction.onClicked.addListener(createOrShowHelmWindow);

function createOrShowHelmWindow() {
  chrome.tabs.query({
    title: 'Helm Session: *'
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
      let width = 800, height = 475;
      let left = (screen.width >> 1) - (width >> 1);
      let top = (screen.height >> 1) - (height >> 1);

      chrome.windows.create({
        type: 'popup',
        left,
        top,
        width,
        height,
        url: 'helm.html'
      });
    }
  });
}

chrome.browserAction.onClicked.addListener(createOrShowHelmWindow);

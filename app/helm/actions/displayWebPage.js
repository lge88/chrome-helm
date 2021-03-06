let lastWindowId = null;

chrome.windows.onFocusChanged.addListener((windowId) => {
  chrome.tabs.query({ windowId }, (tabs) => {
    const isHelmWindow = tabs.some((tab) => /Helm Session:/.test(tab.title));
    if (!isHelmWindow) lastWindowId = windowId;
  });
});

function refocusToHelm(callback) {
  chrome.tabs.query({
    title: 'Helm Session: *'
  }, (tabs) => {
    const helmTab = tabs[0];
    chrome.windows.update(helmTab.windowId, {
      focused: true
    }, callback);
  });
}

export const displayWebPage = {
  name: 'displayWebPage',
  title: 'Display web page.',
  details: 'Display web page without leaving Helm session.',

  // So it won't show in action selection UI.
  canRun(candidates) {
    return false;
  },

  run(candidates, context, callback) {
    const candidate = candidates[0];

    if (candidate.tab) {
      chrome.tabs.update(candidate.tab.id, {
        active: true
      }, () => {
        if (lastWindowId !== candidate.tab.windowId) {
          chrome.windows.update(candidate.tab.windowId, {
            focused: true
          }, refocusToHelm.bind(null, callback));
        } else {
          refocusToHelm(callback);
        }
      });
    }
  }
};

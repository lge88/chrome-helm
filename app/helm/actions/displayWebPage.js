export const displayWebPage = {
  name: 'displayWebPage',
  displayedName: 'Display web page.',
  description: 'Display web page without leaving Helm session.',

  canRun(candidates) {
    return candidates.length === 1 && candidates[0].url;
  },

  run(candidates, context, callback) {
    const candidate = candidates[0];

    if (candidate.tab) {
      chrome.tabs.update(candidate.tab.id, {
        active: true
      }, () => {
        // TODO: optimize this window focus jump
        chrome.windows.update(candidate.tab.windowId, {
          focused: true
        }, () => {
          chrome.tabs.query({
            title: 'Helm Session: *'
          }, (tabs) => {
            const helmTab = tabs[0];
            chrome.windows.update(helmTab.windowId, {
              focused: true
            }, callback);
          });
        });
      });
    }
  }
};

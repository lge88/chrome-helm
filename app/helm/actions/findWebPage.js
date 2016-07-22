export const findWebPage = {
  name: 'findWebPage',
  title: 'Find web page(s) [ Default ].',
  // details: 'Find web page(s) [ Default ].',

  canRun(candidates) {
    return candidates.length === 1 && candidates[0].url;
  },

  run(candidates, context, callback) {
    const candidate = candidates[0];

    if (candidate.tab) {
      chrome.tabs.update(candidate.tab.id, {
        active: true,
        selected: true
      }, () => {
        chrome.windows.update(candidate.tab.windowId, {
          focused: true
        }, callback);
      });
    } else {
      chrome.tabs.create({ url: candidate.url }, callback);
    }
  }
};

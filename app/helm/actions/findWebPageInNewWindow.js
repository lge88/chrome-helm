export const findWebPageInNewWindow = {
  name: 'findWebPageInNewWindow',
  title: 'Find web page in new window.',
  // details: 'Find web page in new window.',

  canRun(candidates) {
    return candidates.length === 1 && candidates[0].url;
  },

  run(candidates, context, callback) {
    const candidate = candidates[0];

    if (candidate.tab) {
      chrome.windows.create({ tabId: candidate.tab.id }, callback);
    } else {
      chrome.windows.create({ url: candidate.url }, callback);
    }
  }
};

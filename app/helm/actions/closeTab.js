export const closeTab = {
  name: 'closeTab',
  title: 'Close opened tab',

  canRun(candidates) {
    return candidates.length === 1 &&
      candidates[0].tab &&
      candidates[0].tab.id;
  },

  run(candidates, context, callback) {
    chrome.tabs.remove(candidates[0].tab.id, callback);
  }
};

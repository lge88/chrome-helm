export const removeFromHistory = {
  name: 'removeFromHistory',
  title: 'Remove from history.',

  canRun(candidates) {
    return candidates.length > 0 &&
      candidates[0].history &&
      candidates[0].url;
  },

  run(candidates, context, callback) {
    const candidate = candidates[0];
    const { url } = candidate;
    chrome.history.deleteUrl({ url }, callback);
  }
};

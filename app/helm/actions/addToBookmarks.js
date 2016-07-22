export const addToBookmarks = {
  name: 'addToBookmarks',
  title: 'Add to bookmarks',

  canRun(candidates) {
    return candidates.length > 0 &&
      !candidates[0].bookmark &&
      candidates[0].url &&
      candidates[0].title;
  },

  run(candidates, context, callback) {
    const candidate = candidates[0];
    const { url, title } = candidate;
    chrome.bookmarks.create({ url, title }, callback);
  }
};

export const removeFromBookmarks = {
  name: 'removeFromBookmarks',
  title: 'Remove from bookmarks.',

  canRun(candidates) {
    return candidates.length > 0 &&
      candidates[0].bookmark &&
      candidates[0].bookmark.id;
  },

  run(candidates, context, callback) {
    const candidate = candidates[0];
    const { bookmark } = candidate;
    const { id } = bookmark;
    chrome.bookmarks.remove(id, callback);
  }
};

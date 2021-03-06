
export const findWebPage = {
  name: 'findWebPage',
  displayedName: 'Find web page',
  sources: [ 'tabs', 'bookmarks', 'history', 'googleSuggest', 'webSearch' ],
  actions: [
    'findWebPage',
    'displayWebPage',
    'findWebPageInNewWindow',
    'closeTab',
    'addToBookmarks',
    'removeFromBookmarks',
    'removeFromHistory',
  ],
  defaultAction: 'findWebPage',
  persistentAction: 'displayWebPage',
  sourceOptions: {
    tabs: {
      searchableAttributes: [ 'title', 'url' ]
    }
  }
};

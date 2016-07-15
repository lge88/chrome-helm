
export const findWebPage = {
  name: 'findWebPage',
  displayedName: 'Find web page',
  sources: [ 'tabs', 'bookmarks', 'history', 'googleSuggest', 'webSearch' ],
  actions: [ 'findWebPage' ],
  sourceOptions: {
    tabs: {
      searchableAttributes: [ 'title', 'url' ]
    }
  }
};

export const findTab = {
  name: 'findTab',
  displayedName: 'Find browser tab',
  sources: [ 'tabs' ],
  actions: [ 'findWebPage' ]
};

import { AttributeMatcher } from '../../utils/AttributeMatcher';

function createTabCandidate(tab) {
  return {
    thumb: tab.favIconUrl,
    title: tab.title,
    details: tab.url,
    sourceName: 'tabs',
    url: tab.url,
    tab: {
      windowId: tab.windowId,
      id: tab.id
    }
  };
}

function getKey(windowId, tabId) {
  return `${windowId}:${tabId}`;
}

export class TabSource {
  static key = 'tabs';
  static displayedName = 'Browser Tabs';

  static defaultOptions = {
    limit: 100,
    searchableAttributes: [ 'title', 'url' ]
  };

  constructor(options) {
    this._options = { ...TabSource.defaultOptions, ...options };
    this._timestamps = {};
  }

  bootstrap(callback) {
    const { searchableAttributes } = this._options;
    this._matcher = new AttributeMatcher(searchableAttributes);

    chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
      const key = getKey(windowId, tabId);
      this._timestamps[key] = Date.now();
    });

    callback();
  }

  byTimestamp = (a, b) => {
    const tsA = this._timestamps[getKey(a.tab.windowId, a.tab.id)];
    const tsB = this._timestamps[getKey(b.tab.windowId, b.tab.id)];
    if (tsA && tsB) return tsB - tsA;
    if (tsA) return -1;
    if (tsB) return 1;
    return (a.tab.windowId - b.tab.windowId) * 100 + (a.tab.id - b.tab.id);
  };

  search(query, options, callback) {
    const matcherFilter = this._matcher.test.bind(this._matcher, query);
    const filter = (candidate) => matcherFilter(candidate) && !/Helm Session:/.test(candidate.title);
    const { limit } = { ...this._options, ...options };

    chrome.tabs.query({}, (aTabs) => {
      let candidates = aTabs.filter(filter).map(createTabCandidate);
      candidates.sort(this.byTimestamp);
      callback(candidates.slice(0, limit));
    });
  }

  destory() {}
}

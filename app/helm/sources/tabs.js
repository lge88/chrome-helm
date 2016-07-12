import { AttributeMatcher } from '../../utils/AttributeMatcher';

function createTabCandidate(tab) {
  return {
    thumb: tab.favIconUrl,
    title: tab.title,
    details: tab.url,
    url: tab.url,
    tab: tab,
    sourceName: 'tabs'
  };
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

    const { searchableAttributes } = this._options;
    this._matcher = new AttributeMatcher(searchableAttributes);
  }

  search(query, options, callback) {
    const filter = this._matcher.test.bind(this._matcher, query);
    const { limit } = { ...this._options, ...options };
    chrome.tabs.query({}, (aTabs) => {
      let candidates = [];
      for (let i = 0, len = aTabs.length; i < len; ++i) {
        const tab = aTabs[i];
        const candidate = createTabCandidate(tab);
        if (filter(candidate)) candidates.push(candidate);
        if (candidates.length >= limit) break;
      }
      callback(candidates);
    });
  }

  destory() {}
}

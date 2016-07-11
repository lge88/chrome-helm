import { AttributeMatcher } from '../../utils/AttributeMatcher';

const maxNumCandidates = 10;

function createTabCandidate(tab) {
  return {
    title: tab.title,
    url: tab.url,
    thumb: tab.favIconUrl,
    tab: tab,
    sourceName: 'tabs'
  };
}

export class TabSource {
  static key = 'tabs';
  static displayedName = 'Browser Tabs';

  constructor(options) {
    this._matcher = new AttributeMatcher([ 'title', 'url' ]);
  }

  search(query, options, callback) {
    chrome.tabs.query({}, (aTabs) => {
      let candidates = [];
      for (let i = 0, len = aTabs.length; i < len; ++i) {
        const tab = aTabs[i];
        const candidate = createTabCandidate(tab);
        if (this._matcher.test(query, candidate)) {
          candidates.push(candidate);
        }
        if (candidates.length >= maxNumCandidates) break;
      }
      callback(candidates);
    });
  }

  destory() {}
}

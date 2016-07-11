function createHistoryCandidate(historyItem) {
  return {
    title: historyItem.title,
    url: historyItem.url,
    historyItem: historyItem,
    sourceName: 'history'
  };
}

// TODO:
// history.search only matches item.title/url from the start, not very helpful :(
const msInOneDay = 24 * 3600 * 1000;
export class HistorySource {
  static key = 'history';
  static displayedName = 'History';

  static defaultOptions = {
    limit: 100,
    lookbackInDays: 30
  };

  constructor(options) {
    this._options = { ...HistorySource.defaultOptions, ...options };
  }

  search(query, options, callback) {
    const { limit, lookbackInDays } = { ...this._options, ...options };
    const endTime = Date.now();
    const startTime = endTime - lookbackInDays * msInOneDay;
    chrome.history.search({
      text: query,
      maxResults: limit,
      startTime,
      endTime
    }, (items) => {
      const candidates = items.map(createHistoryCandidate);
      callback(candidates);
    });
  }

  destroy() {}
}

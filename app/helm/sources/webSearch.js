export class WebSearchSource {
  static key = 'webSearch';
  static displayedName = 'Search Web';

  static defaultOptions = {
    searchEndpoint: 'https://www.google.com/search?q='
  };

  constructor(options) {
    this._options = { ...WebSearchSource.defaultOptions, options };
  }

  search(query, options, callback) {
    const { searchEndpoint } = { ...this._options, options };
    const candidate = {
      title: query,
      url: searchEndpoint + encodeURIComponent(query)
    };
    callback([ candidate ]);
  }

  destory() {}
}

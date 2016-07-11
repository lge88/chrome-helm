function parseXml(xmlStr) {
  return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
}

export class GoogleSuggestSource {
  static key = 'googleSuggest';
  static displayedName = 'Google Sugguest';

  static defaultOptions = {
    limit: 10,
    suggestEndpoint: 'http://www.google.com/complete/search?output=toolbar&q=',
    searchEndpoint: 'https://www.google.com/search?q='
  };

  constructor(options) {
    this._options = { ...GoogleSuggestSource.defaultOptions, options };
  }

  search(query, options, callback) {
    const { suggestEndpoint, searchEndpoint, limit } = { ...this._options, options };
    fetch(suggestEndpoint + encodeURIComponent(query))
      .then(resp => resp.text())
      .then(xml => parseXml(xml))
      .then((doc) => {
        const elements =  doc.querySelectorAll('suggestion');
        let candidates = [];
        for (let i = 0, len = elements.length; i < len; ++i) {
          const suggestion = elements[i].getAttribute('data');
          const candidate = {
            title: suggestion,
            url: searchEndpoint + encodeURIComponent(suggestion)
          };
          candidates.push(candidate);
          if (candidates.length > limit) break;
        }
        callback(candidates);
      })
      .catch((err) => callback([]));
  }

  destory() {}
}

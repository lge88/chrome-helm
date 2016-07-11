const whiteSpaceRe = /\s+/;

function escapeRegex(str) {
  return str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&');
};

export class AttributeMatcher {
  constructor(attributes) {
    this._attributes = attributes;
  }

  test(query, candidate) {
    if (query === '') return true;

    const filterToken = (token) => {
      const tokenNoRegex = escapeRegex(token);
      const re = new RegExp(tokenNoRegex, "i");
      return this._attributes.some(attr => candidate[attr] && candidate[attr].search(re) >= 0);
    };

    return query.split(whiteSpaceRe).every(filterToken);
  }
}

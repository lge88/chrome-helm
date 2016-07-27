const queryTokenDelimRe = /\s+/;
const attrTokenDelimRe = /[ \t,\-_\/.:]+/;

function escapeRegex(str) {
  return str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&');
};

export class AttributeMatcher {
  constructor(attributes) {
    this._attributes = attributes;
  }

  test(query, candidate) {
    if (query === '') return true;

    const filterToken = (queryToken) => {
      const queryTokenRe = new RegExp('^' + escapeRegex(queryToken), "i");

      return this._attributes.some((key) => {
        const attr = candidate[key];
        if (!attr) return false;

        const attrTokens = attr.split(attrTokenDelimRe);
        return attrTokens.some((attrToken) => queryTokenRe.test(attrToken));
      });
    };

    return query.split(queryTokenDelimRe).every(filterToken);
  }
}

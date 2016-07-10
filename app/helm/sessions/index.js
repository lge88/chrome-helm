import { sources } from '../sources';

class Session {
  constructor(options) {
    const {
      name,
      displayedName,
      sources: sourceNames,
      actions: actionNames } = options;
    this._name = name;
    this._displayedName = displayedName;
    this._sources = sourceNames.map(name => ({
      klass: sources[name],
      instance: new sources[name]()
    }));
    this._actions = actionNames;
  }

  getName() {
    return this._name;
  }

  getDisplayedName() {
    return this._displayedName || this._name;
  }

  search(query, options, onUpdate) {
    this._sources.forEach(source => {
      source.instance.search(query, {}, candidates => {
        onUpdate({
          sourceName: source.klass.key,
          displayedName: source.klass.displayedName,
          candidates
        });
      });
    });
  }
}

export const findTab = new Session({
  name: 'findTab',
  displayedName: 'Find browser tab',
  sources: [ 'tabs' ],
  actions: []
});

export const findWebPage = new Session({
  name: 'findWebPage',
  displayedName: 'Find web page',
  sources: [ 'tabs', 'bookmarks' ],
  actions: []
});

import { sources } from '../sources';

export class Session {
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

  getSourceNames() {
    return this._sources.map(source => source.klass.key);
  }

  getActionNames() {
    return this._actions.map(action => action);
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

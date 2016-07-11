import { sources } from '../sources';
import { actions } from '../actions';

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
    this._actions = actionNames.map(name => actions[name]);
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
    return this._actions.map(action => action.name);
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

  getActionCandidates(candidates, callback) {
    let actionCandidates = [];

    for (let i = 0, len = this._actions.length; i < len; ++i) {
      const action = this._actions[i];
      let canRun = true;
      if (typeof action.canRun === 'function') {
        canRun = action.canRun(candidates);
      }
      if (!canRun) continue;

      actionCandidates.push({
        title: action.displayedName || action.name,
        description: action.description,
        actionIndex: i
      });
    }

    return callback(actionCandidates);
  }

  runAction(actionIndex, candidates, context, callback) {
    const action = this._actions[actionIndex];
    if (!action) return callback(`Can not find action with index ${actionIndex}`);

    if (typeof action.canRun === 'function') {
      if (!action.canRun(candidates)) {
        return callback(`${action.name} can not run on given candidates`);
      }
    }

    return action.run(candidates, context, callback);
  }
}

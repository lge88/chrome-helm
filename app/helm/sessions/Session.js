import { sources } from '../sources';
import { actions } from '../actions';
import { AttributeMatcher } from '../../utils/AttributeMatcher';

export class Session {
  constructor(options) {
    const {
      name,
      displayedName,
      sources: sourceNames,
      actions: actionNames,
      defaultAction,
      persistentAction
    } = options;
    const sourceOptions = options.sourceOptions || {};

    this._name = name;
    this._displayedName = displayedName;

    // Create sources
    this._sources = sourceNames.map(name => ({
      klass: sources[name],
      instance: new sources[name](sourceOptions[name] || {})
    }));

    // TODO: Create actions
    // TODO: pass options to source
    this._actionMatcher = new AttributeMatcher([ 'title', 'details' ]);
    this._actions = actionNames.map(name => actions[name]);
    this._defaultAction = actions[defaultAction];
    this._persistentAction = actions[persistentAction];

    // Searching state:
    this._currentQuery = null;
  }

  // Async bootstrap for sources
  bootstrap(callback) {
    let needBootstrap = this._sources.reduce((sofar, source) => (
      typeof source.instance.bootstrap === 'function' ? sofar + 1 : sofar
    ), 0);
    const bootstrapOne = (source) => {
      if (typeof source.instance.bootstrap === 'function') {
        source.instance.bootstrap(() => {
          needBootstrap -= 1;
          if (needBootstrap === 0) callback();
        });
      }
    };
    this._sources.forEach(bootstrapOne);
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

  getActions() {
    return this._actions.map(action => ({
      name: action.name,
      displayedName: action.displayedName,
      description: action.description
    }));
  }

  search(query, options, onUpdate, onComplete) {
    let remaining = this._sources.length;
    this._currentQuery = query;
    this._sources.forEach(source => {
      source.instance.search(query, {}, candidates => {
        remaining -= 1;
        if (this._currentQuery === query) {
          onUpdate({
            sourceName: source.klass.key,
            displayedName: source.klass.displayedName,
            candidates
          });
          if (remaining === 0 && typeof onComplete === 'function') onComplete();
        }
      });
    });
  }

  getFilteredActions(query, candidates, callback) {
    let actionCandidates = [];
    const matcherFilter = this._actionMatcher.test.bind(this._actionMatcher, query);

    for (let i = 0, len = this._actions.length; i < len; ++i) {
      const action = this._actions[i];
      let canRun = true;
      if (typeof action.canRun === 'function') {
        canRun = action.canRun(candidates);
      }

      if (canRun && matcherFilter(action)) {
        actionCandidates.push({
          name: action.name,
          title: action.title || action.name,
          details: action.details
        });
      }
    }

    return callback(actionCandidates);
  }

  getActionByName(actionName) {
    for (let i = 0, len = this._actions.length; i < len; ++i) {
      const action = this._actions[i];
      if (action.name === actionName) return action;
    }
    return null;
  }

  runAction(actionName, candidates, context, callback) {
    const action = this.getActionByName(actionName);
    if (!action) return callback(`Can not find action with name ${actionName}`);

    if (typeof action.canRun === 'function') {
      if (!action.canRun(candidates)) {
        return callback(`${action.name} can not run on given candidates`);
      }
    }

    if (typeof callback !== 'function') callback = () => {};
    return action.run(candidates, context, callback);
  }

  runDefaultAction(candidates, context, callback) {
    this._defaultAction.run(candidates, context, callback);
  }

  runPersistentAction(candidates, context, callback) {
    this._persistentAction.run(candidates, context, callback);
  }
}

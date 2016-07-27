import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';

import ItemSelection from '../components/ItemSelection';
import ActionSelection from '../components/ActionSelection';
import * as HelmActions from '../actions/helm';

class App extends Component {
  componentDidMount() {
    this.props.actions.selectSession('findWebPage', () => {
      // this.props.actions.loadState('state01');
    });
  }

  renderItemSelection() {
    const {
      isLoading,
      actions
    } = this.props;

    const {
      query,
      sourceNames,
      resultsBySourceName,
      cursor,
      multiSelections
    } = this.props.itemSelection;

    const handlers = {
      runDefaultAction: actions.runDefaultAction,
      runPersistentAction: actions.runPersistentAction,
      prevCandidate: actions.prevCandidate,
      nextCandidate: actions.nextCandidate,
      toggleActionSelection: actions.toggleActionSelection,
      quitHelmSession: actions.quitHelmSession
    };

    return (
      <HotKeys handlers = { handlers }>
        <ItemSelection
            isLoading = { isLoading }
            query = { query }
            sourceNames = { sourceNames }
            resultsBySourceName = { resultsBySourceName }
            cursor = { cursor }
            multiSelections = { multiSelections }
            search = { actions.search }
        />
      </HotKeys>
    );
  }

  renderActionSelection() {
    const {
      isLoading,
      actions
    } = this.props;

    const {
      query,
      actions: helmActions,
      index
    } = this.props.actionSelection;

    const handlers = {
      runDefaultAction: actions.runSelectedAction,
      prevCandidate: actions.prevAction,
      nextCandidate: actions.nextAction,
      toggleActionSelection: actions.toggleActionSelection,
      quitHelmSession: actions.quitHelmSession
    };

    return (
      <HotKeys handlers = { handlers }>
        <ActionSelection
            isLoading = { isLoading }
            query = { query }
            actions = { helmActions }
            index = { index }
            search = { actions.filterActions }
        />
      </HotKeys>
    );
  }

  render() {
    const {
      currentSessionDisplayedName,
      keyMap,
      mode
    } = this.props;

    let body = null;
    if (mode === 'itemSelection') {
      body = this.renderItemSelection();
    } else if (mode === 'actionSelection') {
      body = this.renderActionSelection();
    }

    document.title = `Helm Session: ${currentSessionDisplayedName}`;
    return (
      <HotKeys keyMap = { keyMap }>
        { body !== null && body }
      </HotKeys>
    );
  }
}

export default connect(
  state => state,
  dispatch => {
    const actions = bindActionCreators(HelmActions, dispatch);
    window.HelmActions = actions;
    return { actions };
  }
)(App);

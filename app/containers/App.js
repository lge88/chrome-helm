import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';

import ItemSelection from '../components/ItemSelection';
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

  render() {
    const {
      currentSessionDisplayedName,
      keyMap,
      mode
    } = this.props;

    let body = null;
    if (mode === 'itemSelection') {
      body = this.renderItemSelection();
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

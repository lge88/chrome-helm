import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';

import SearchBox from '../components/SearchBox';
import SourceList from '../components/SourceList';
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
        <div>
          <SearchBox
              query = { query }
              isLoading = { isLoading }
              onChange = { actions.search }
          />
          <SourceList
              sourceNames = { sourceNames }
              resultsBySourceName = { resultsBySourceName }
              cursor = { cursor }
              multiSelections = { multiSelections }
          />
        </div>
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

    chrome.windows.getCurrent({}, (win) => {
      chrome.windows.onFocusChanged.addListener((winId) => {
        if (winId === win.id) {
          // actions.search('');
        }
      });
    });

    return { actions };
  }
)(App);

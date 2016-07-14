import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import SourceList from '../components/SourceList';
import * as HelmActions from '../actions/helm';

class App extends Component {
  componentDidMount() {
    // this.props.actions.search('');
    this.props.actions.selectSession('findWebPage');
    // this.props.actions.selectSession('findTab');
    // this.props.actions.loadState('state03');
  }

  render() {
    const {
      query,
      isLoading,
      currentSessionDisplayedName,
      sourceNames,
      resultsBySourceName,
      cursor,
      multiSelections,
      actions
    } = this.props;
    document.title = `Helm Session: ${currentSessionDisplayedName}`;
    return (
      <div>
        <SearchBox
            query = { query }
            isLoading = { isLoading }
            onChange = { actions.search }
            onKeyDown = { actions.onKeyDown }
        />
        <SourceList
            sourceNames = { sourceNames }
            resultsBySourceName = { resultsBySourceName }
            cursor = { cursor }
            multiSelections = { multiSelections }
        />
      </div>
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

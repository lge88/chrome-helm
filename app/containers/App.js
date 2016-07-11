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
    // this.props.actions.loadState('state01');
  }

  render() {
    const { query, sourceNames, resultsBySourceName, cursor, multiSelections, actions } = this.props;
    return (
      <div>
        <SearchBox
            query = { query }
            onChange = { actions.search }
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
  dispatch => ({
    actions: bindActionCreators(HelmActions, dispatch)
  })
)(App);

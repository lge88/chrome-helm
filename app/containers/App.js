import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CandidateGroupList from '../components/CandidateGroupList';
import * as HelmActions from '../actions/helm';

class App extends Component {
  render() {
    const { query, groups, selections, actions } = this.props;
    return (
      <div>
        <SearchBox
            query = { query }
            onChange = { actions.search }
        />
        <CandidateGroupList
            groups = { groups }
            selections = { selections }
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

import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBox from './SearchBox';
import SourceList from './SourceList';

export default class ActionSelection extends Component {
  static actionSelectionGroupText = 'Select Action';

  render() {
    const {
      isLoading,
      query,
      search,
      actions,
      index
    } = this.props;

    const sourceNames = [ 'actions' ];
    const resultsBySourceName = {
      actions: {
        displayedName: ActionSelection.actionSelectionGroupText,
        candidates: actions
      }
    };
    const cursor = {
      sourceName: 'actions',
      index
    };

    return (
      <div>
        <SearchBox
            isLoading = { isLoading }
            query = { query }
            onChange = { search }
        />
        <SourceList
            sourceNames = { sourceNames }
            resultsBySourceName = { resultsBySourceName }
            cursor = { cursor }
        />
      </div>
    );
  }
}

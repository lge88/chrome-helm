import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBox from './SearchBox';
import SourceList from './SourceList';

export default class ItemSelection extends Component {
  render() {
    const {
      isLoading,
      query,
      sourceNames,
      resultsBySourceName,
      cursor,
      multiSelections,
      search
    } = this.props;

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
            multiSelections = { multiSelections }
        />
      </div>
    );
  }
}

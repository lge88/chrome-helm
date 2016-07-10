import React, { PropTypes, Component } from 'react';
import CandidateGroup from './CandidateGroup';

export default class SourceList extends Component {
  renderCandidateGroups() {
    const { cursor, multiSelections, sourceNames, resultsBySourceName } = this.props;
    return sourceNames.map((sourceName) => {
      let selectedIndex = null, markedIndices = [];
      if (cursor && cursor.sourceName === sourceName) selectedIndex = cursor.index;

      let markedIndexMap = multiSelections && multiSelections[sourceName];

      const results = resultsBySourceName[sourceName];
      if (!results) return null;

      const { displayedName, candidates } = results;
      return (
        <CandidateGroup
            key = { sourceName }
            name = { displayedName }
            candidates = { candidates }
            selectedIndex = { selectedIndex }
            markedIndexMap = { markedIndexMap }
        />
      );
    });
  }

  render() {
    return (
      <div className="candidate-group-list">
        { this.renderCandidateGroups() }
      </div>
    );
  }

}

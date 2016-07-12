import React, { PropTypes, Component } from 'react';
import CandidateGroup from './CandidateGroup';

export default class SourceList extends Component {
  renderCandidateGroups() {
    const { cursor, multiSelections, sourceNames, resultsBySourceName } = this.props;
    // TODO: This should be computed from window height and UI size.
    const totalQuota = 15;
    let quota = totalQuota, elements = [];
    for (let i = 0, len = sourceNames.length; i < len; ++i) {
      const sourceName = sourceNames[i];

      let selectedIndex = null, markedIndices = [];
      if (cursor && cursor.sourceName === sourceName) selectedIndex = cursor.index;

      let markedIndexMap = multiSelections && multiSelections[sourceName];

      const results = resultsBySourceName[sourceName];
      if (!results) continue;

      const { displayedName, candidates } = results;
      if (candidates.length > 0) {
        elements.push(
          <CandidateGroup
              key = { sourceName }
              name = { displayedName }
              candidates = { candidates }
              selectedIndex = { selectedIndex }
              markedIndexMap = { markedIndexMap }
              limit = { quota }
          />
        );
        quota -= candidates.length;
      }
      if (quota <= 0) break;
    }
    return elements;
  }

  render() {
    return (
      <div>
        { this.renderCandidateGroups() }
      </div>
    );
  }

}

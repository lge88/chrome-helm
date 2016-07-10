import React, { PropTypes, Component } from 'react';
import CandidateGroup from './CandidateGroup';

export default class CandidateGroupList extends Component {
  renderCandidateGroups() {
    const { selections, groups } = this.props;
    return groups.map((group, i) => {
      let selectedIndices = selections[i];
      if (typeof selectedIndices === "undefined") selectedIndices = [];

      const { name, candidates } = group;
      return (
        <CandidateGroup
            key = {i}
            name = {name}
            candidates = {candidates}
            selectedIndices = {selectedIndices}
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

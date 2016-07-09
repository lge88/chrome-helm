import React, { PropTypes, Component } from 'react';
import CandidateGroup from './CandidateGroup';

export default class CandidateGroupList extends Component {
	renderCandidateGroups() {
		const { selections, groups } = this.props;
		return groups.map((group, i) => {
      const selectedIndices = selections[i];
      const { name, candidates } = group;
			return (
        <CandidateGroup
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

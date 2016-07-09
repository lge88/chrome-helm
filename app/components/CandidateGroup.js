import React, { PropTypes, Component } from 'react';
import CandidateItem from './CandidateItem';

export default class CandidateGroup extends Component {
	renderCandidates() {
		const { name, selectedIndices, candidates } = this.props;
		return candidates.map((candidate, i) => {
      const key = name + '-' + i;
			return (
        <CandidateItem
            key = {key}
            selected = {selectedIndices.indexOf(i) != -1}
            thumb = {candidate.thumb}
            title = {candidate.title}
            url = {candidate.url}
        />
      );
    });
	}

	render() {
    const { name } = this.props;
		return (
      <div>
        <div className="candidate-group-name">{name}</div>
			  <table className = "candidate-group">
			    <tbody>
			      { this.renderCandidates() }
				  </tbody>
			  </table>
      </div>
		);
	}

}

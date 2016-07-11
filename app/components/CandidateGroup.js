import React, { PropTypes, Component } from 'react';
import CandidateItem from './CandidateItem';

export default class CandidateGroup extends Component {
  renderCandidates() {
    const { name, selectedIndex, markedIndexMap, candidates, limit } = this.props;
    let els = [];
    for (let i = 0, len = candidates.length; i < len; ++i) {
      const candidate = candidates[i];
      const key = name + '-' + i;
      els.push(
        <CandidateItem
            key = { key }
            selected = { selectedIndex === i }
            marked = { !!(markedIndexMap && markedIndexMap[i]) }
            thumb = { candidate.thumb }
            title = { candidate.title }
            url = { candidate.url }
        />
      );
      if (els.length >= limit) break;
    }

    return els;
  }

  render() {
    const { name } = this.props;
    return (
      <div className="candidate-group">
        <div className="candidate-group-name">{name}</div>
        <table className = "candidate-group-table">
          <tbody>
            { this.renderCandidates() }
          </tbody>
        </table>
      </div>
    );
  }

}

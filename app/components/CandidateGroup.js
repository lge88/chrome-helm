import React, { PropTypes, Component } from 'react';
import CandidateCell from './CandidateCell';
import style from './CandidateGroup.css';

export default class CandidateGroup extends Component {
  renderCandidates() {
    const { name, selectedIndex, markedIndexMap, candidates, limit } = this.props;
    let els = [];
    for (let i = 0, len = candidates.length; i < len; ++i) {
      const candidate = candidates[i];
      const key = name + '-' + i;
      els.push(
        <CandidateCell
            key = { key }
            selected = { selectedIndex === i }
            marked = { !!(markedIndexMap && markedIndexMap[i]) }
            thumb = { candidate.thumb }
            title = { candidate.title }
            details = { candidate.details }
        />
      );
      if (els.length >= limit) break;
    }

    return els;
  }

  render() {
    const { name } = this.props;
    return (
      <div className = { style.group }>
        <div className = { style.groupName }> { name } </div>
        <table className = { style.groupTable } >
          <tbody>
            { this.renderCandidates() }
          </tbody>
        </table>
      </div>
    );
  }

}

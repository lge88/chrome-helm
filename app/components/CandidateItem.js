import React, { PropTypes, Component } from 'react';

class CandidateItem extends Component {
  render() {
    const { selected, thumb, title, url } = this.props;
    let rowCls = 'candidate';
    if (selected) rowCls += ' selected';
    return (
      <tr className={rowCls}>
        <td className="candidate-thumb" height="40" width="8%">
          <img src={thumb} />
        </td>
        <td className="candidate-content" height="40" width="92%">
          <div className="candidate-title">{title}</div>
          <div className="candidate-url">{url}</div>
        </td>
      </tr>
    );
  }
}

export default CandidateItem;

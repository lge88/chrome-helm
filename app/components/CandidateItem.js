import React, { PropTypes, Component } from 'react';

const itemHeight = 30;
const thumbWidthPercent = 6;

class CandidateItem extends Component {
  render() {
    const { selected, thumb, title, url } = this.props;

    let rowCls = 'candidate';
    if (selected) rowCls += ' selected';
    return (
      <tr className={rowCls}>
        <td className="candidate-thumb"
            height={itemHeight}
            width={thumbWidthPercent + '%'}>
          <img src={thumb} />
        </td>
        <td className="candidate-content"
            height={itemHeight}
            width={(1.0 - thumbWidthPercent) + '%'}>
          <div className="candidate-title">{title}</div>
          <div className="candidate-url">{url}</div>
        </td>
      </tr>
    );
  }
}

export default CandidateItem;

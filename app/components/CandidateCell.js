import React, { PropTypes, Component } from 'react';
import style from './CandidateCell.css';
import classnames from 'classnames';

const itemHeight = 30;
const thumbWidthPercent = 6;

class CandidateCell extends Component {
  render() {
    const {
      selected,
      marked,
      thumb,
      title,
      details
    } = this.props;

    /* let rowCls = 'candidate';
     * if (selected) rowCls += ' selected';
     * if (marked) rowCls += ' marked';*/
    return (
      <tr className = { classnames({
          [style.normal]: !selected && !marked,
          [style.selected]: selected,
          [style.marked]: marked
        }) }
      >
        <td className = { style.thumb }
            height = { itemHeight }
            width = { thumbWidthPercent + '%' }>
          <img src = { thumb } />
        </td>
        <td height = { itemHeight }
            width = { (1.0 - thumbWidthPercent) + '%' }>
          <div className = { style.title }> { title } </div>
          <div className = { style.details }> { details } </div>
        </td>
      </tr>
    );
  }
}

export default CandidateCell;

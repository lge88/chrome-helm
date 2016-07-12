import React, { PropTypes, Component } from 'react';
import style from './SearchBox.css';

export default class SearchBox extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { query, onKeyDown } = this.props;
    return (
      <input
          className = { style.searchBox }
          type = "text"
          autoComplete = "off"
          autoCorrect = "off"
          autoCapitalize = "off"
          autoFocus = { true }
          spellCheck = "false"
          value = { query }
          onChange = { this.handleChange }
          onKeyDown = { onKeyDown }
      />
    );
  }
}

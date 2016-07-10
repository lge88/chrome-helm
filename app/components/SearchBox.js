import React, { PropTypes, Component } from 'react';

export default class SearchBox extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { query } = this.props;
    return (
      <input
          className = "search-box"
          type = "text"
          autoComplete = "off"
          autoCorrect = "off"
          autoCapitalize = "off"
          autoFocus = { true }
          spellCheck = "false"
          value = { query }
          onChange = { this.handleChange }
      />
    );
  }
}

import React, { PropTypes, Component } from 'react';
import style from './SearchBox.css';
import classnames from 'classnames';

export default class SearchBox extends Component {
  static loadingPlaceHolder = "Loading...";
  static searchPlaceHolder = "Search tabs, bookmarks, history or web pages";

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  handleKeyDown = (event) => {
    const { isLoading, onKeyDown } = this.props;
    if (!isLoading) onKeyDown(event);
  };

  render() {
    const { query, isLoading } = this.props;
    return (
      <input
          className = { classnames({
              [style.searchBox]: true,
              [style.loading]: isLoading
            }) }
          type = "text"
          autoComplete = "off"
          autoCorrect = "off"
          autoCapitalize = "off"
          autoFocus
          spellCheck = "false"
          placeholder = { isLoading ? SearchBox.loadingPlaceHolder : SearchBox.searchPlaceHolder }
          value = { query }
          onChange = { this.handleChange }
          onKeyDown = { this.handleKeyDown }
      />
    );
  }
}

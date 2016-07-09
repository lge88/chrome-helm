import React, { PropTypes, Component } from 'react';

export default class SearchBox extends Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

	render() {
		return (
			<input id="search-box"
      type="text"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      autofocus
      spellcheck="false" />
		);
	}

}

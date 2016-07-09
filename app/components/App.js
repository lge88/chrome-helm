import React, { PropTypes, Component } from 'react';
import SearchBox from './SearchBox';
import CandidateList from './CandidateList';

export default class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

	render() {
		return (
			<div>
			<SearchBox />
			<CandidateList />
			</div>
		);
	}

}

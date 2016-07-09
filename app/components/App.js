import React, { PropTypes, Component } from 'react';
import SearchBox from './SearchBox';
import CandidateGroupList from './CandidateGroupList';
import groups from '../candidate-groups.json';

export default class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      query: "",
      groups: groups,
      selections: [
        [0, 2, 3],
        [1],
        []
      ]
    };
  }

  handleChange = (delta) => {
    this.setState({ query: delta.query });
  };

	render() {
		return (
			<div>
			  <SearchBox
            query = {this.state.query}
            onChange = { this.handleChange }
        />
			  <CandidateGroupList
            groups = {this.state.groups}
            selections = { this.state.selections }
        />
			</div>
		);
	}

}

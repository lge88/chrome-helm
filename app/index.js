import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import createStore from './store/configureStore';

const initialState = {
  query: '',
  groups: [],
  selections: [],
  /* groups: require('./candidate-groups.json'),
   * selections: [
   *   [0, 2, 3],
   *   [1],
   *   []
   * ]*/
};

ReactDOM.render(
  <Root store = {createStore(initialState)} />,
  document.querySelector('#root')
);

// import CandidateItem from './components/CandidateItem';
// ReactDOM.render(
//   <CandidateItem
//       selected = {false}
//       thumb = "https://assets-cdn.github.com/favicon.ico"
//       url = "https://github.com/emacs-helm/helm/blob/master/helm-net.el"
//       title = "helm/helm-net.el at master emacs-helm/helm"
//   />,
//   document.body
// );

// import CandidateGroup from './components/CandidateGroup';
// import candidates from './candidates.json';

// ReactDOM.render(
//   <CandidateGroup
//       name = "Opened Tabs"
//       candidates = {candidates}
//       selectedIndices = {[0,2,3]}
//   />,
//   document.querySelector('#root')
// );

// import CandidateGroupList from './components/CandidateGroupList';
// import candidateGroups from './candidate-groups.json';
// console.log('candidates groups', candidateGroups);

// ReactDOM.render(
//   <CandidateGroupList
//       groups = {candidateGroups}
//       selections = {[ [0,2,3], [1], [] ]}
//   />,
//   document.querySelector('#root')
// );

// import SearchBox from './components/SearchBox';

// function onChange(e) {
//   console.log('changed', e);
// }

// ReactDOM.render(
//   <SearchBox
//       query="hello"
//       onChange={onChange}
//   />,
//   document.querySelector('#root')
// );

import React from 'react';
import ReactDOM from 'react-dom';

// import App from './components/App';
// ReactDOM.render(
//   <App/>,
//   document.querySelector('#root')
// );

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

import CandidateGroupList from './components/CandidateGroupList';
import candidateGroups from './candidate-groups.json';
console.log('candidates groups', candidateGroups);

ReactDOM.render(
  <CandidateGroupList
      groups = {candidateGroups}
      selections = {[ [0,2,3], [1], [] ]}
  />,
  document.querySelector('#root')
);

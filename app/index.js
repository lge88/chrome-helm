import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import createStore from './store/configureStore';
import { state00 } from './fixtures/states';

ReactDOM.render(
  <Root store = {createStore(state00)} />,
  document.querySelector('#root')
);

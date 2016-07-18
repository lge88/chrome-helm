import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import createStore from './store/configureStore';
import { state00 } from './fixtures/states';

const initialState = state00;
const store = createStore(initialState);

ReactDOM.render(
  <Root store = { store } />,
  document.querySelector('#root')
);

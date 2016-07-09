import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  );

  return store;
}

export default configureStore;

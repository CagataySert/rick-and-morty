import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger, thunk)
);

export default store;

import { createStore, compose } from 'redux';
import { rootReducer } from './rootReducer';

let composeEnhancers;

if (process.env.NODE_ENV === 'production') {
  // In production builds there is no need to hook into the redux-devtools extension.
  composeEnhancers = compose;
} else {
  // In dev we hook into the redux-devtools extension if present.
  composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
}

const store = createStore(rootReducer, composeEnhancers());

// We export the store but also expose shortcuts to the getState and dispatch properties on the store.
export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;
